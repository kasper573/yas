import { z } from "@yas/zod";
import { TextField, NumberField, BasicFormLayout, createForm } from "@yas/ui";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(BasicFormLayout),
);
