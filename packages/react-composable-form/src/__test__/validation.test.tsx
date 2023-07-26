import { z } from "zod";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createForm } from "../createForm";

describe("validation", () => {
  it("displays errors on submit by default", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string().min(3) }))
        .type(z.string(), ({ errors = [] }) => (
          <span>{errors.length ? errors.join(",") : "No errors"}</span>
        ))
        .layout(({ fields: { Foo }, handleSubmit }) => (
          <>
            <Foo />
            <button onClick={handleSubmit}>submit</button>
          </>
        )),
    );
    const { getByText } = render(<Form value={{ foo: "" }} />);
    getByText("No errors");
    await userEvent.click(getByText("submit"));
    getByText("String must contain at least 3 character(s)");
  });

  it("can display errors on blur", async () => {
    const Form = createForm((options) =>
      options
        .validateOn("blur")
        .schema(z.object({ foo: z.string().min(3), bar: z.string().min(5) }))
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              <span>
                {`${name}: ${errors.length ? errors.join(",") : "No errors"}`}
              </span>
            </>
          ),
        ),
    );
    const { getByRole, getByText } = render(
      <Form value={{ foo: "", bar: "" }} />,
    );
    getByText("foo: No errors");
    getByText("bar: No errors");
    await userEvent.click(getByRole("textbox", { name: "foo" }));
    await userEvent.tab();
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: No errors");
    await userEvent.click(getByRole("textbox", { name: "bar" }));
    await userEvent.tab();
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: String must contain at least 5 character(s)");
  });

  it("can display errors on change", async () => {
    const Form = createForm((options) =>
      options
        .validateOn("change")
        .schema(z.object({ foo: z.string().min(3), bar: z.string().min(5) }))
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              <span>
                {`${name}: ${errors.length ? errors.join(",") : "No errors"}`}
              </span>
            </>
          ),
        ),
    );
    const { getByRole, getByText } = render(
      <Form value={{ foo: "", bar: "" }} />,
    );
    getByText("foo: No errors");
    getByText("bar: No errors");
    await userEvent.type(getByRole("textbox", { name: "foo" }), "b");
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: No errors");
    await userEvent.type(getByRole("textbox", { name: "bar" }), "b");
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: String must contain at least 5 character(s)");
  });

  it("can fix errors", async () => {
    const Form = createForm((options) =>
      options
        .validateOn("change")
        .schema(z.object({ foo: z.string().min(3) }))
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              {errors.length ? errors.join(",") : "No errors"}
            </>
          ),
        ),
    );
    const { getByRole, getByText } = render(<Form value={{ foo: "" }} />);
    getByText("No errors");
    await userEvent.type(getByRole("textbox", { name: "foo" }), "b");
    getByText("String must contain at least 3 character(s)");
    await userEvent.type(getByRole("textbox", { name: "foo" }), "bar");
    getByText("No errors");
  });

  it("does not trigger submit for invalid data", async () => {
    const onSubmit = jest.fn();
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string().min(3) }))
        .layout(({ handleSubmit }) => (
          <button onClick={handleSubmit}>submit</button>
        )),
    );
    const { getByText } = render(
      <Form value={{ foo: "" }} onSubmit={onSubmit} />,
    );
    await userEvent.click(getByText("submit"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("can display field errors from refined validations with paths", async () => {
    const objectType = z
      .object({
        password: z.string(),
        passwordConfirm: z.string(),
      })
      .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm", "password"],
      });

    const Form = createForm((options) =>
      options
        .validateOn("change")
        .schema(objectType)
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              {errors.join(",")}
            </>
          ),
        ),
    );

    const { getByRole, getByText } = render(<Form />);
    await userEvent.type(getByRole("textbox", { name: "password" }), "foo");
    await userEvent.type(
      getByRole("textbox", { name: "passwordConfirm" }),
      "bar",
    );
    getByText("Passwords do not match");
  });
});
