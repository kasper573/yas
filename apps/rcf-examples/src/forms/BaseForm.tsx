import { createForm } from "react-composable-form";
import { z } from "zod";
import { TextField } from "../fields/TextField";
import { NumberField } from "../fields/NumberField";
import { DefaultFormLayout } from "../layouts/DefaultFormLayout";

export const BaseForm = createForm((options) =>
  options
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .layout(DefaultFormLayout)
);
