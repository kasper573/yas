import { z } from "@yas/zod";
import { createForm } from "./rcf";
import { TextField } from "./TextField";
import { NumberField } from "./NumberField";
import { BasicFormLayout } from "./BasicFormLayout";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(BasicFormLayout),
);
