import { z } from "zod";
import type { RenderResult } from "@yas/test/testing-library";
import { render, userEvent } from "@yas/test/testing-library";
import type { ComponentProps, ComponentType } from "react";
import { StrictMode, useState } from "react";
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

    const fn = vi.fn();
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
        .type(z.string(), ({ onChange, value }) => (
          <input value={value} onChange={(e) => onChange?.(e.target.value)} />
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
        .type(z.string(), ({ onChange, value = "" }) => (
          <input onChange={(e) => onChange?.(e.target.value)} value={value} />
        )),
    );
    const { getByRole } = render(<Form />);

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "baz");
    expect(getByRole("textbox")).toHaveValue("baz");
  });

  describe("external field value access", () => {
    describe("strict mode", () => {
      testStrictModeSensitiveCases((element) =>
        render(<StrictMode>{element}</StrictMode>),
      );
    });

    describe("non-strict mode", () => {
      it("ignores changes in unused other fields", async () => {
        let valRenders = 0;
        const Form = createForm((options) =>
          options
            .schema(z.object({ a: z.number(), b: z.number(), val: z.string() }))
            .field("a", ({ name, value, onChange }) => (
              <input
                aria-label={name}
                value={value ?? ""}
                onChange={(e) => onChange?.(parseInt(e.target.value))}
              />
            ))
            .field("b", ({ name, value, onChange }) => (
              <input
                aria-label={name}
                value={value ?? ""}
                onChange={(e) => onChange?.(parseInt(e.target.value))}
              />
            ))
            .field("val", ({ fieldValues }) => (
              <span>{`val:${fieldValues?.a},renders:${++valRenders}`}</span>
            )),
        );
        const { getByRole, getByText } = render(
          <Form defaultValue={{ a: 0, b: 0, val: "baz" }} />,
        );
        getByText("val:0,renders:1");
        await userEvent.type(getByRole("textbox", { name: "a" }), "2");
        getByText("val:2,renders:2");
        await userEvent.type(getByRole("textbox", { name: "b" }), "3");
        getByText("val:2,renders:2");
      });

      it("ignores changes when no longer using field value", async () => {
        const valRenders: unknown[] = [];
        const Form = createForm((options) =>
          options
            .schema(z.object({ a: z.string(), val: z.string() }))
            .field("a", ({ name, value, onChange }) => (
              <input
                aria-label={name}
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
              />
            ))
            .field("val", ({ fieldValues }) => {
              const val = valRenders.length < 5 ? fieldValues?.a : "unknown";
              valRenders.push(val);
              return null;
            }),
        );
        const { getByRole } = render(
          <Form defaultValue={{ a: "", val: "baz" }} />,
        );
        expect(valRenders).toEqual([""]);
        await userEvent.type(getByRole("textbox"), "hello world");
        expect(valRenders).toEqual(["", "h", "he", "hel", "hell", "unknown"]);
      });

      testStrictModeSensitiveCases(render);
    });

    function testStrictModeSensitiveCases(
      render: (element: JSX.Element) => RenderResult,
    ) {
      it("can access initial value of another field", () => {
        const Form = createForm((options) =>
          options
            .schema(z.object({ foo: z.string(), bar: z.string() }))
            .field("foo", () => <></>)
            .field("bar", ({ fieldValues }) => (
              <span>bar:{fieldValues?.foo}</span>
            )),
        );
        const { getByText } = render(
          <Form value={{ foo: "hello", bar: "world" }} />,
        );
        getByText("bar:hello");
      });

      it("can react to changes in a single other field (uncontrolled)", async () => {
        const Form = createForm((options) =>
          options
            .schema(z.object({ foo: z.string(), bar: z.string() }))
            .field("foo", ({ value, onChange }) => (
              <input
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
              />
            ))
            .field("bar", ({ fieldValues }) => (
              <span>bar:{fieldValues?.foo}</span>
            )),
        );
        const { getByText, getByRole } = render(<Form />);
        await userEvent.type(getByRole("textbox"), "A");
        getByText("bar:A");
      });

      it("reacts to changes in a single other field", async () => {
        const Form = createForm((options) =>
          options
            .schema(z.object({ foo: z.string(), bar: z.string() }))
            .field("foo", ({ value, onChange }) => (
              <input
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
              />
            ))
            .field("bar", ({ fieldValues }) => (
              <span>bar:{fieldValues?.foo}</span>
            )),
        );
        const { getByRole, getByText } = render(
          <Form defaultValue={{ foo: "before", bar: "baz" }} />,
        );
        getByText("bar:before");
        await userEvent.clear(getByRole("textbox"));
        await userEvent.type(getByRole("textbox"), "after");
        getByText("bar:after");
      });

      it("reacts to changes in multiple other fields", async () => {
        const Form = createForm((options) =>
          options
            .schema(z.object({ a: z.number(), b: z.number(), sum: z.string() }))
            .field("a", ({ name, value, onChange }) => (
              <input
                aria-label={name}
                value={value ?? ""}
                onChange={(e) => onChange?.(parseInt(e.target.value))}
              />
            ))
            .field("b", ({ name, value, onChange }) => (
              <input
                aria-label={name}
                value={value ?? ""}
                onChange={(e) => onChange?.(parseInt(e.target.value))}
              />
            ))
            .field("sum", ({ fieldValues }) => (
              <span>sum:{fieldValues?.a! + fieldValues?.b!}</span>
            )),
        );
        const { getByRole, getByText } = render(
          <Form defaultValue={{ a: 0, b: 0, sum: "baz" }} />,
        );
        getByText("sum:0");
        await userEvent.type(getByRole("textbox", { name: "a" }), "2");
        getByText("sum:2");
        await userEvent.type(getByRole("textbox", { name: "b" }), "3");
        getByText("sum:5");
      });

      it("can react to changes in a single other field (uncontrolled, strict mode)", async () => {
        const Form = createForm((options) =>
          options
            .schema(z.object({ foo: z.string(), bar: z.string() }))
            .field("foo", ({ value, onChange }) => (
              <input
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
              />
            ))
            .field("bar", ({ fieldValues }) => (
              <span>bar:{fieldValues?.foo}</span>
            )),
        );
        const { getByText, getByRole } = render(<Form />);
        await userEvent.type(getByRole("textbox"), "hello");
        getByText("bar:hello");
      });
    }
  });

  it("can reset", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, value = "" }) => (
          <input onChange={(e) => onChange?.(e.target.value)} value={value} />
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
        .type(z.string(), ({ onChange, value = "" }) => (
          <input onChange={(e) => onChange?.(e.target.value)} value={value} />
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
