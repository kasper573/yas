import { Box, Stack } from "@mui/material";
import type { FormValidationMode } from "react-composable-form";
import { formValidationModes } from "react-composable-form";
import type { ReactNode } from "react";
import { useState } from "react";
import { MultiSelectField } from "./fields/MultiSelectField";

export type ExampleContentRenderer = (props: {
  validateOn: FormValidationMode[];
  onSubmit?: (data: unknown) => unknown;
}) => ReactNode;

export function ExampleContent({
  menu,
  children,
}: {
  menu?: ReactNode | ExampleContentRenderer;
  children?: ReactNode | ExampleContentRenderer;
}) {
  const [validateOn, setValidateOn] = useState<FormValidationMode[]>([
    "blur",
    "submit",
  ]);

  function onSubmit(data: unknown) {
    alert(JSON.stringify(data, null, 2));
  }

  function normalizeContent(content: ReactNode | ExampleContentRenderer) {
    return typeof content === "function"
      ? content({ validateOn, onSubmit })
      : content;
  }

  return (
    <Stack direction="row" gap={4}>
      <Box sx={{ flex: 1 }}>{normalizeContent(children)}</Box>
      <Box sx={{ width: 250 }}>
        <MultiSelectField
          sx={{ mb: 4 }}
          name="Validate on"
          value={validateOn}
          options={formValidationModes.map((x) => ({ label: x, value: x }))}
          onChange={setValidateOn}
        />
        {normalizeContent(menu)}
      </Box>
    </Stack>
  );
}
