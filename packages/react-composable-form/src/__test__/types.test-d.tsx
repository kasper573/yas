import { z } from "zod";
import { expectTypeOf } from "vitest";
import type { inferFormValue } from "../createForm";
import { createForm } from "../createForm";

it("inferFormValue resolves to the correct type", () => {
  const Form = createForm((options) =>
    options.schema(z.object({ foo: z.string() })),
  );

  expectTypeOf<inferFormValue<typeof Form>>({ foo: "hello" });
});

it("layout disallows unknown properties", () => {
  const DefaultForm = createForm();
  const FormWithLayout = createForm((options) => options.layout(() => null));

  // @ts-expect-error foo is not a valid property
  const element1 = <DefaultForm foo={123} />;

  // @ts-expect-error bar is not a valid property
  const element2 = <FormWithLayout bar={123} />;
});
