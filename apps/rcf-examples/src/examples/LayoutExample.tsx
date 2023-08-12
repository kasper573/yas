import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { Box, Button, Typography } from "@mui/material";
import { BaseForm } from "../BaseForm";
import { TextField } from "../fields/TextField";
import { InlineFormLayout } from "../layouts/InlineFormLayout";
import { ExampleContent } from "../ExampleContent";

type LoginPayload = inferFormValue<typeof LoginForm>;

const LoginForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
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
        <Email sx={{ transform: `rotateZ(-10deg)` }} size="small" />
        <Password
          name="PWD"
          helperText="I'm so special!"
          sx={{ transform: `rotateZ(10deg)`, mx: 3 }}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ transform: `rotateZ(-10deg)` }}
        >
          Submit
        </Button>
      </form>
    </Box>
  )),
);

export function LayoutExample() {
  const [data, setData] = useState<LoginPayload>();
  const showData = (data: LoginPayload) => alert(JSON.stringify(data, null, 2));
  return (
    <ExampleContent>
      {(props) => (
        <>
          <LoginForm
            {...props}
            title="Basic layout"
            value={data}
            onChange={setData}
            onSubmit={showData}
          />
          <Typography variant="h4" sx={{ my: 4 }}>
            Inline layout
          </Typography>
          <InlineUserForm
            {...props}
            value={data}
            onChange={setData}
            onSubmit={showData}
          />
          <Typography variant="h4" sx={{ my: 4 }}>
            Specialized layout
          </Typography>
          <SpecializedUserForm {...props} value={data} onChange={setData} />
        </>
      )}
    </ExampleContent>
  );
}
