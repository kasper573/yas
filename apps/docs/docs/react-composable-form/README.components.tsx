import { createForm } from "react-composable-form";
import { z } from "zod";

export const MyForm = createForm((options) =>
  options
    // TextField, NumberField and SwitchField are all react components.
    // Ignore where they come from for now, we'll explain how to create them later.
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .type(z.boolean(), SwitchField),
);

export function TextField() {
  return null;
}

function NumberField() {
  return null;
}

function SwitchField() {
  return null;
}
