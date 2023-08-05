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
