import { z } from "@yas/zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { Box, Button, Text, TextField, BaseForm } from "@yas/ui";
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
    .field("password", TextField, { type: "password" }),
);

const InlineLoginForm = LoginForm.extend((options) =>
  options.layout(InlineFormLayout),
);

const SpecializedLoginForm = LoginForm.extend((options) =>
  options.layout(({ fields: { Email, Password }, handleSubmit }) => (
    <Box sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Email style={{ transform: `rotateZ(-10deg)` }} />
        <Password
          name="PWD"
          info="I'm so special!"
          sx={{ mx: 3 }}
          style={{ transform: `rotateZ(10deg)` }}
        />
        <Button
          type="submit"
          variant="outlined"
          style={{ transform: `rotateZ(-10deg)` }}
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
          <Text variant="h4" sx={{ my: 4 }}>
            Inline layout
          </Text>
          <InlineLoginForm
            {...props}
            value={data}
            onChange={setData}
            onSubmit={showData}
          />
          <Text variant="h4" sx={{ my: 4 }}>
            Specialized layout
          </Text>
          <SpecializedLoginForm {...props} value={data} onChange={setData} />
        </>
      )}
    </ExampleContent>
  );
}
