import { z } from "zod";
import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { BasicFormLayout } from "./layouts/BasicFormLayout";
import { createForm } from "./rcf";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(BasicFormLayout)
);
