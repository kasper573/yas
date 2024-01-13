import { z } from "@yas/validate";
import { TextField } from "../TextField";
import { NumberField } from "../NumberField";
import { BasicFormLayout } from "../BasicFormLayout";
import { createForm } from "../shared/rcf";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(BasicFormLayout),
);
