import { z } from "@yas/validate";
import { TextField } from "./TextField";
import { NumberField } from "./NumberField";
import { createForm } from "./rcf";
import { BasicFormLayout } from "./BasicFormLayout";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(BasicFormLayout),
);
