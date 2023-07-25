import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { Typography } from "@mui/material";
import { BaseForm } from "../forms/BaseForm";
import { TextField } from "../fields/TextField";
import { InlineFormLayout } from "../layouts/InlineFormLayout";

const UserForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .field("password", TextField, { password: true }),
);

const InlineUserForm = UserForm.extend((options) =>
  options.layout(InlineFormLayout),
);

export function LoginExample() {
  const [data, setData] = useState<inferFormValue<typeof UserForm>>();
  return (
    <>
      <UserForm value={data} onChange={setData} title="Login form" />

      <Typography variant="h4" sx={{ my: 2 }}>
        Regular form
      </Typography>
      <InlineUserForm value={data} onChange={setData} />
    </>
  );
}
