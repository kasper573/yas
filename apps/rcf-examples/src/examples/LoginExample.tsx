import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { Box, Button, keyframes, Typography } from "@mui/material";
import { BaseForm } from "../BaseForm";
import { TextField } from "../fields/TextField";
import { InlineFormLayout } from "../layouts/InlineFormLayout";

type LoginPayload = inferFormValue<typeof LoginForm>;

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

const SpecializedUserForm = LoginForm.extend((options) =>
  options.layout(({ fields: { Email, Password }, handleSubmit }) => (
    <Box sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Email sx={{ transform: "rotateZ(-15deg)" }} />
        <Password sx={{ transform: "rotateZ(15deg)", mx: 3 }} />
        <Button
          type="submit"
          variant="contained"
          sx={{ animation: `${spin} 1s linear infinite` }}
        >
          Submit
        </Button>
      </form>
    </Box>
  )),
);

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export function LoginExample() {
  const [data, setData] = useState<LoginPayload>();
  const showData = (data: LoginPayload) => alert(JSON.stringify(data, null, 2));
  return (
    <>
      <LoginForm
        title="Basic layout"
        value={data}
        onChange={setData}
        onSubmit={showData}
      />
      <Typography variant="h4" sx={{ my: 2 }}>
        Inline layout
      </Typography>
      <InlineUserForm value={data} onChange={setData} onSubmit={showData} />
      <Typography variant="h4" sx={{ my: 2 }}>
        Specialized layout
      </Typography>
      <SpecializedUserForm value={data} onChange={setData} />
    </>
  );
}
