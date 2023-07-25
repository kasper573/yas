import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { BaseForm } from "../forms/BaseForm";
import { TextField } from "../fields/TextField";

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

export function LoginExample() {
  const [data, setData] = useState<inferFormValue<typeof UserForm>>();
  return <UserForm value={data} onChange={setData} title="Login form" />;
}
