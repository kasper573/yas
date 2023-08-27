import { z } from "zod";
import { InlineFormLayout } from "./auxillary/layouts/InlineFormLayout";
import { TextField } from "./auxillary/fields/TextField";
import { Stack } from "./auxillary/components/Stack";
import { createForm } from "./auxillary/rcf";
import { NumberField } from "./auxillary/fields/NumberField";
import { CardFormLayout } from "./auxillary/layouts/CardFormLayout";

const LoginForm = createForm((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .field("password", TextField, { password: true })
    .layout(CardFormLayout)
);

const InlineLoginForm = LoginForm.extend((options) =>
  options.layout(InlineFormLayout)
);

const SpecializedLoginForm = LoginForm.extend((options) =>
  options.layout(({ fields: { Email, Password }, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Email style={{ border: "5px solid #0b3c2b" }} />
        <Password
          name="PWD (I am special)"
          style={{ border: "5px solid #3c2674" }}
        />
        <button className="button button--primary" type="submit">
          Submit
        </button>
      </Stack>
    </form>
  ))
);

export function LayoutExample() {
  return (
    <Stack gap={4}>
      <div>
        <h4>Card layout</h4>
        <LoginForm />
      </div>
      <div>
        <h4>Inline layout</h4>
        <InlineLoginForm />
      </div>
      <div>
        <h4>Specialized layout</h4>
        <SpecializedLoginForm />
      </div>
    </Stack>
  );
}
