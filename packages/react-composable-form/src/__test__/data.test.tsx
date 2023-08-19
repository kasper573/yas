import "@testing-library/jest-dom";
import { z } from "zod";
import { render } from "@testing-library/react";
import type { ComponentProps, ComponentType } from "react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { createForm } from "../createForm";
import { silenceErrorLogs } from "./utils";

describe("data", () => {
  it("can be displayed", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ value }) => (
          <input defaultValue={String(value)} />
        )),
    );
    const { getByRole } = render(<Form value={{ foo: "bar" }} />);
    expect(getByRole("textbox")).toHaveValue("bar");
  });

  it("can use default value", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ value, onChange }) => (
          <input value={value} onChange={(e) => onChange?.(e.target.value)} />
        ))
        .layout(({ fields: { Foo }, handleSubmit }) => (
          <>
            <Foo />
            <button onClick={handleSubmit}>submit</button>
          </>
        )),
    );

    const fn = jest.fn();
    const { getByRole } = render(
      <Form defaultValue={{ foo: "default" }} onSubmit={fn} />,
    );
    expect(getByRole("textbox")).toHaveValue("default");
    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "changed");
    await userEvent.click(getByRole("button"));
    expect(fn).toHaveBeenCalledWith({ foo: "changed" });
  });

  it("cannot use both value and defaultValue", () => {
    const Form = createForm((options) =>
      options.schema(z.object({ foo: z.string() })),
    );

    const restoreErrorLogs = silenceErrorLogs();
    expect(() =>
      render(<Form value={{ foo: "default" }} defaultValue={{ foo: "baz" }} />),
    ).toThrow(
      "Cannot set both defaultValue and value, please use one or the other",
    );
    restoreErrorLogs();
  });

  it("can be updated via props", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, ...rest }) => (
          <input onChange={(e) => onChange?.(e.target.value)} {...rest} />
        )),
    );
    function App() {
      const [data, setData] = useState({ foo: "default" });
      return (
        <>
          <Form value={data} onChange={setData} />
          <button onClick={() => setData({ foo: "changed" })}>change</button>
        </>
      );
    }

    const { getByRole } = render(<App />);

    await userEvent.click(getByRole("button"));
    expect(getByRole("textbox")).toHaveValue("changed");
  });

  it("can be updated via input", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, value = "", ...rest }) => (
          <input
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
            {...rest}
          />
        )),
    );
    const { getByRole } = render(<Form />);

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "baz");
    expect(getByRole("textbox")).toHaveValue("baz");
  });

  it("can reset", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, value = "", ...rest }) => (
          <input
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
            {...rest}
          />
        ))
        .layout(({ fields: { Foo }, reset }) => (
          <>
            <Foo />
            <button onClick={reset}>reset</button>
          </>
        )),
    );
    const { getByRole } = render(<Form />);

    await userEvent.type(getByRole("textbox"), "baz");
    expect(getByRole("textbox")).toHaveValue("baz");
    await userEvent.click(getByRole("button", { name: "reset" }));
    expect(getByRole("textbox")).toHaveValue("");
  });

  it("can be emitted", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, value = "", ...rest }) => (
          <input
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
            {...rest}
          />
        )),
    );

    let data: unknown;
    const { getByRole } = render(<Form onChange={(d) => (data = d)} />);

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "input");
    expect(data).toEqual({ foo: "input" });
  });

  it("changes to one field does not re-render other fields (without errors)", async () => {
    const Bar = renderCounter(({ name, value, onChange }) => (
      <input aria-label={name} value={value} onChange={onChange} />
    ));
    const Foo = renderCounter(({ name, value, onChange }) => (
      <input aria-label={name} value={value} onChange={onChange} />
    ));
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.string() }))
        .field("foo", Foo)
        .field("bar", Bar),
    );
    const { getByRole } = render(<Form value={{ foo: "", bar: "" }} />);
    const fooBefore = Foo.getCount();
    const barBefore = Bar.getCount();
    await userEvent.type(getByRole("textbox", { name: "foo" }), "baz");
    expect(Foo.getCount() - fooBefore).toBe(3);
    expect(Bar.getCount() - barBefore).toBe(0);
  });

  it("changes to one field does not re-render other fields (with errors)", async () => {
    const Bar = renderCounter(({ name, value, onChange }) => (
      <input aria-label={name} value={value} onChange={onChange} />
    ));
    const Foo = renderCounter(({ name, value, onChange }) => (
      <input aria-label={name} value={value} onChange={onChange} />
    ));
    const Form = createForm((options) =>
      options
        .validateOn("change")
        .schema(
          z
            .object({ foo: z.string().min(3), bar: z.string().min(3) })
            .refine(() => false, { message: "Some error" }),
        )
        .field("foo", Foo)
        .field("bar", Bar),
    );
    const { getByRole } = render(<Form value={{ foo: "", bar: "" }} />);
    const fooBefore = Foo.getCount();
    const barBefore = Bar.getCount();
    await userEvent.type(getByRole("textbox", { name: "foo" }), "baz");
    expect(Foo.getCount() - fooBefore).toBe(3);
    expect(Bar.getCount() - barBefore).toBe(0);
  });
});

function renderCounter<T extends ComponentType<any>>(Component: T) {
  let count = 0;
  function Wrapper(props: ComponentProps<T>) {
    count++;
    return <Component {...props} />;
  }
  Wrapper.getCount = () => count;
  return Wrapper;
}
