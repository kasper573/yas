import { z } from "zod";
import { InlineFormLayout } from "./auxillary/layouts/InlineFormLayout";
import { TextField } from "./auxillary/fields/TextField";
import { Stack } from "./auxillary/components/Stack";
import { createForm } from "./auxillary/rcf";
import { CardFormLayout } from "./auxillary/layouts/CardFormLayout";

export const LoginForm = createForm((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .type(z.string(), TextField)
    .field("password", TextField, { type: "password" })
    .layout(CardFormLayout),
);

export const InlineLoginForm = LoginForm.extend((options) =>
  options.layout(InlineFormLayout),
);

export const SpecializedLoginForm = LoginForm.extend((options) =>
  options.layout(({ fields: { Email, Password }, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Email style={{ background: "#5b1111" }} />
        <Password name="PWD (I am special)" style={{ background: "#272878" }} />
        <button className="button button--warning" type="submit">
          Very special submit
        </button>
      </Stack>
    </form>
  )),
);
