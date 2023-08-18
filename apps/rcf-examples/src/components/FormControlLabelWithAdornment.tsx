import type { ComponentProps, ReactNode } from "react";
import { Box, FormControlLabel } from "@mui/material";

export interface FormControlLabelWithAdornmentProps
  extends ComponentProps<typeof FormControlLabel> {
  adornment?: ReactNode;
  size?: FormControlLabelSize;
}

export function FormControlLabelWithAdornment({
  sx,
  label,
  adornment,
  componentsProps,
  size,
  ...props
}: FormControlLabelWithAdornmentProps) {
  return (
    <FormControlLabel
      {...props}
      sx={{ ...sx, mr: 0 }}
      label={
        <>
          {label}
          {adornment !== undefined && (
            <Box sx={{ ml: "auto" }}>{adornment}</Box>
          )}
        </>
      }
      componentsProps={{
        ...componentsProps,
        typography: {
          variant: size ? sizeFontVariants[size] : undefined,
          display: "flex",
          flex: 1,
          ...componentsProps?.typography,
        },
      }}
    />
  );
}

export type FormControlLabelSize = keyof typeof sizeFontVariants;

const sizeFontVariants = {
  small: "body2",
  medium: "body1",
} as const;
