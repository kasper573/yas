import "@testing-library/jest-dom";
import { z } from "zod";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createForm } from "../createForm";

describe("discriminated union schema renders the correct fields", () => {
  it("when discriminator is not set", () => {
    const Form = createDiscriminatorForm();

    const { getByText, getAllByTestId } = render(
      <Form value={{ base: "foo", type: undefined as never, str: "hello" }} />,
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

  function createDiscriminatorForm() {
    return createForm((options) =>
      options
        .schema(
          z.object({ base: z.string() }).and(
            z.discriminatedUnion("type", [
              z.object({
                type: z.literal("string"),
                str: z.string(),
              }),
              z.object({
                type: z.literal("number"),
                num: z.number(),
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

  it("only validates the active fields", async () => {
    let lastFieldErrors: unknown;
    const Form = createSelectorForm().extend((options) =>
      options.layout(({ fields, fieldErrors, handleSubmit }) => {
        lastFieldErrors = fieldErrors;
        return <button onClick={handleSubmit}>submit</button>;
      }),
    );
    const { getByTestId, getByRole } = render(
      <Form value={{ base: "foo", type: "string", str: "hello" }} />,
    );

    await userEvent.click(getByRole("button"));
    expect(lastFieldErrors).toEqual({
      str: ["String must contain at least 10 character(s)"],
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
        .conditionals(({ Base, Type, Str, Num }, values) => ({
          Base,
          Type,
          Str: values.type === "string" ? Str : undefined,
          Num: values.type === "number" ? Num : undefined,
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
