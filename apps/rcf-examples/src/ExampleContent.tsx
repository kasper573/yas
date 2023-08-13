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
  menu?: ReactNode;
  children?: ExampleContentRenderer;
}) {
  const [validateOn, setValidateOn] = useState<FormValidationMode[]>([
    "blur",
    "submit",
  ]);
  function onSubmit(data: unknown) {
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <Stack direction="row" gap={4}>
      <Box sx={{ flex: 1 }}>{children?.({ validateOn, onSubmit })}</Box>
      <Box sx={{ width: 250 }}>
        <MultiSelectField
          sx={{ mb: 4 }}
          name="Validate on"
          value={validateOn}
          options={formValidationModes.map((x) => ({ label: x, value: x }))}
          onChange={setValidateOn}
        />
        {menu}
      </Box>
    </Stack>
  );
}