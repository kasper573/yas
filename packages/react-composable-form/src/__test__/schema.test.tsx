import { render } from "@testing-library/react";
import { z } from "zod";
import { createForm } from "../createForm";

describe("schema", () => {
  it("defines which fields are rendered", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), () => <span>foo</span>),
    );
    const { getByText } = render(<Form />);
    getByText("foo");
  });

  it("can be extended from predefined forms", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ name }) => <span>{name}</span>),
    );
    const ExtendedForm = Form.extend((options) =>
      options.schema(z.object({ bar: z.string() })),
    );
    const { getByText } = render(<ExtendedForm />);
    getByText("bar");
  });
});
