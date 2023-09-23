import { z } from "zod";
import { TextField, NumberField } from "@yas/ui";
import { BasicFormLayout } from "./layouts/BasicFormLayout";
import { createForm } from "./rcf";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(BasicFormLayout),
);
