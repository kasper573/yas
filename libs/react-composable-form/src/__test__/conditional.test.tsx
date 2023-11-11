import { z } from "zod";
import { render, userEvent } from "@yas/test/vitest/react";
import { createForm } from "../createForm";

describe("discriminated union schema", () => {
  describe("renders the correct fields", () => {
    it("when discriminator is not set", () => {
      const Form = createDiscriminatorForm();

      const { getByText, getAllByTestId } = render(
        <Form
          value={{
            base: "foo",
            str: "hello",
            // @ts-expect-error Intentionally assigning invalid value to test what happens if discriminator is not set
            type: undefined,
          }}
        />,
      );

      expect(getAllByTestId("field")).toHaveLength(2);
      getByText("base:foo");
      getByText("type:undefined");
    });

    it("when discriminator is set", () => {
      const Form = createDiscriminatorForm();

      const { getByText, getAllByTestId, rerender } = render(
        <Form value={{ base: "foo", type: "string", str: "hello" }} />,
      );

      expect(getAllByTestId("field")).toHaveLength(3);
      getByText("base:foo");
      getByText("type:string");
      getByText("str:hello");

      rerender(<Form value={{ base: "bar", type: "number", num: 42 }} />);

      expect(getAllByTestId("field")).toHaveLength(3);
      getByText("base:bar");
      getByText("type:number");
      getByText("num:42");
    });

    it("when using a layout", () => {
      const Form = createDiscriminatorForm().extend((options) =>
        options.layout(({ fields: { Base, Type, Str, Num } }) => (
          <>
            <Base />
            <Type />
            <Str />
            <Num />
          </>
        )),
      );

      const { getByText, getAllByTestId } = render(
        <Form value={{ base: "foo", type: "string", str: "hello" }} />,
      );

      expect(getAllByTestId("field")).toHaveLength(3);
      getByText("base:foo");
      getByText("type:string");
      getByText("str:hello");
    });
  });

  it("only validates the active fields", async () => {
    let lastFieldErrors: unknown;
    const Form = createDiscriminatorForm().extend((options) =>
      options.layout(({ fields, fieldErrors, handleSubmit }) => {
        lastFieldErrors = fieldErrors;
        return <button onClick={handleSubmit}>submit</button>;
      }),
    );
    const { getByRole } = render(
      <Form value={{ base: "foo", type: "string", str: "hello" }} />,
    );

    await userEvent.click(getByRole("button"));
    expect(lastFieldErrors).toEqual({
      str: ["String must contain at least 10 character(s)"],
    });
  });

  it("can submit when conditionally valid", async () => {
    const Form = createDiscriminatorForm().extend((options) =>
      options.layout(({ handleSubmit }) => (
        <button onClick={handleSubmit}>submit</button>
      )),
    );
    const handleSubmit = vi.fn();
    const { getByRole } = render(
      <Form
        value={{ base: "foo", type: "string", str: "this is a long string" }}
        onSubmit={handleSubmit}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("only submits discriminated data", async () => {
    const Form = createDiscriminatorForm().extend((options) =>
      options.layout(({ handleSubmit }) => (
        <button onClick={handleSubmit}>submit</button>
      )),
    );
    const handleSubmit = vi.fn();
    const { getByRole } = render(
      <Form
        value={{ base: "foo", type: "string", str: "this is a long string" }}
        onSubmit={handleSubmit}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(handleSubmit).toHaveBeenCalledWith({
      base: "foo",
      type: "string",
      str: "this is a long string",
    });
  });

  it("submits data representing the current union", async () => {
    const Form = createDiscriminatorForm().extend((options) =>
      options.layout(({ handleSubmit }) => (
        <button onClick={handleSubmit}>submit</button>
      )),
    );

    const handleSubmit = vi.fn();
    const { getByRole, rerender } = render(
      <Form
        value={{
          base: "foo",
          type: "string",
          str: "this is a long string",
          // @ts-expect-error Ignoring intentional error added for testing just to see what happens if input form data contains excessive fields
          num: 123,
        }}
        onSubmit={handleSubmit}
      />,
    );

    rerender(
      <Form
        value={{ base: "foo", type: "number", num: 20 }}
        onSubmit={handleSubmit}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(handleSubmit).toHaveBeenCalledWith({
      base: "foo",
      type: "number",
      num: 20,
    });
  });

  function createDiscriminatorForm() {
    return createForm((options) =>
      options
        .schema(
          z.object({ base: z.string() }).and(
            z.discriminatedUnion("type", [
              z.object({
                type: z.literal("string"),
                str: z.string().min(10),
              }),
              z.object({
                type: z.literal("number"),
                num: z.number().min(10),
              }),
            ]),
          ),
        )
        .type(z.any(), ({ name, value }) => (
          <span data-testid="field">
            {name}:{`${value}`}
          </span>
        )),
    );
  }
});

describe("conditional fields selector", () => {
  it("renders the correct fields", () => {
    const Form = createSelectorForm();
    const { getByText, rerender } = render(
      <Form value={{ base: "foo", type: "string", str: "hello", num: 0 }} />,
    );

    getByText("base:foo");
    getByText("type:string");
    getByText("str:hello");

    rerender(
      <Form value={{ base: "bar", type: "number", num: 42, str: "" }} />,
    );

    getByText("base:bar");
    getByText("type:number");
    getByText("num:42");
  });

  it("only validates the active fields", async () => {
    let lastFieldErrors: unknown;
    const Form = createSelectorForm().extend((options) =>
      options.layout(({ fields, fieldErrors, handleSubmit }) => {
        lastFieldErrors = fieldErrors;
        return <button onClick={handleSubmit}>submit</button>;
      }),
    );
    const { getByRole } = render(
      <Form value={{ base: "foo", type: "string", str: "hello", num: 0 }} />,
    );

    await userEvent.click(getByRole("button"));
    expect(lastFieldErrors).toEqual({
      str: ["String must contain at least 10 character(s)"],
    });
  });

  it("can submit when conditionally valid", async () => {
    const Form = createSelectorForm().extend((options) =>
      options.layout(({ handleSubmit }) => (
        <button onClick={handleSubmit}>submit</button>
      )),
    );
    const handleSubmit = vi.fn();
    const { getByRole } = render(
      <Form
        value={{ base: "foo", type: "string", str: "a long string", num: 0 }}
        onSubmit={handleSubmit}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("only submits conditional data", async () => {
    const Form = createSelectorForm().extend((options) =>
      options.layout(({ handleSubmit }) => (
        <button onClick={handleSubmit}>submit</button>
      )),
    );
    const handleSubmit = vi.fn();
    const { getByRole } = render(
      <Form
        value={{ base: "foo", type: "string", str: "a long string", num: 0 }}
        onSubmit={handleSubmit}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(handleSubmit).toHaveBeenCalledWith({
      base: "foo",
      type: "string",
      str: "a long string",
    });
  });

  function createSelectorForm() {
    return createForm((options) =>
      options
        .schema(
          z.object({
            base: z.string(),
            type: z.enum(["string", "number"]),
            str: z.string().min(10),
            num: z.number().min(10),
          }),
        )
        .type(z.any(), ({ name, value }) => (
          <span>
            {name}:{`${value}`}
          </span>
        ))
        .conditions((values) => ({
          str: values.type === "string",
          num: values.type === "number",
        })),
    );
  }
});

it("can conditionally render using field values in layout", () => {
  const Form = createForm((options) =>
    options
      .schema(
        z.object({
          base: z.string(),
          type: z.enum(["string", "number"]),
          str: z.string().optional(),
          num: z.number().optional(),
        }),
      )
      .type(z.any(), ({ name, value }) => (
        <span>
          {name}:{`${value}`}
        </span>
      ))
      .layout(({ fields: { Base, Type, Str, Num }, fieldValues }) => {
        const fields = {
          Base,
          Type,
          Str: fieldValues.type === "string" ? Str : undefined,
          Num: fieldValues.type === "number" ? Num : undefined,
        };
        return (
          <>
            {Object.values(fields).map((Component, index) =>
              Component ? <Component key={index} /> : null,
            )}
          </>
        );
      }),
  );

  const { getByText, rerender } = render(
    <Form value={{ base: "foo", type: "string", str: "hello" }} />,
  );

  getByText("base:foo");
  getByText("type:string");
  getByText("str:hello");

  rerender(<Form value={{ base: "bar", type: "number", num: 42 }} />);

  getByText("base:bar");
  getByText("type:number");
  getByText("num:42");
});
