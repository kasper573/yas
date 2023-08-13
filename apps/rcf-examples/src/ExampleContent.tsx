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
  children?: ExampleContentRenderer;
}) {
  const [validateOn, setValidateOn] = useState<FormValidationMode[]>([
    "blur",
    "submit",
  ]);
  function onSubmit(data: unknown) {
    alert(JSON.stringify(data, null, 2));
  }

  const rendererArgs = { validateOn, onSubmit };
  const menuElement = typeof menu === "function" ? menu(rendererArgs) : menu;
  return (
    <Stack direction="row" gap={4}>
      <Box sx={{ flex: 1 }}>{children?.(rendererArgs)}</Box>
      <Box sx={{ width: 250 }}>
        <MultiSelectField
          sx={{ mb: 4 }}
          name="Validate on"
          value={validateOn}
          options={formValidationModes.map((x) => ({ label: x, value: x }))}
          onChange={setValidateOn}
        />
        {menuElement}
      </Box>
    </Stack>
  );
}
