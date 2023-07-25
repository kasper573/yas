import { useMemo, useState } from "react";
import { z } from "zod";
import type { inferFormValue } from "react-composable-form";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BaseForm } from "./forms/BaseForm";
import { SingleSelectField, valueOptions } from "./fields/SelectField";

const categoryType = z.enum(["foo", "bar", "baz"]);
const category2Type = z.enum(["hello", "world"]);

const UserForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        age: z.number(),
        category: categoryType,
        category2: category2Type,
      }),
    )
    .type(categoryType, SingleSelectField, {
      options: valueOptions(categoryType.options),
    })
    .type(category2Type, SingleSelectField, {
      options: valueOptions(category2Type.options),
    }),
);

export function App() {
  const [data, setData] = useState<inferFormValue<typeof UserForm>>();
  const theme = useMemo(() => createTheme({ palette: { mode: "dark" } }), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      Testing forms
      <UserForm value={data} onChange={setData} />
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
    </ThemeProvider>
  );
}
