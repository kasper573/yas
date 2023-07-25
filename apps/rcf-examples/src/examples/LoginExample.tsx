import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { Typography } from "@mui/material";
import { BaseForm } from "../forms/BaseForm";
import { TextField } from "../fields/TextField";
import { InlineFormLayout } from "../layouts/InlineFormLayout";

const LoginForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .field("password", TextField, { password: true }),
);

const InlineUserForm = LoginForm.extend((options) =>
  options.layout(InlineFormLayout),
);

export function LoginExample() {
  const [data, setData] = useState<inferFormValue<typeof LoginForm>>();
  return (
    <>
      <LoginForm value={data} onChange={setData} title="Login form" />

      <Typography variant="h4" sx={{ my: 2 }}>
        Inline form
      </Typography>
      <InlineUserForm value={data} onChange={setData} />
    </>
  );
}
