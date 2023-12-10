import { z } from "@yas/validate";
import { createForm } from "react-composable-form";
import { TextField, NumberField, Button, Stack } from "@yas/ui";

export const UserForm = createForm((options) =>
  options
    .validateOn("blur", "submit")
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .type(z.string().brand("password"), TextField, { type: "password" })
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string().brand("password"),
        age: z.number().optional(),
      }),
    )
    .layout(({ fields: { Email, Password, Age }, reset, handleSubmit }) => (
      <form onReset={reset} onSubmit={handleSubmit}>
        <Stack gap="3">
          <Email />
          <Password />
          <Age />
          <Stack direction="row" gap="2" justify="end" sx={{ ml: "auto" }}>
            <Button color="secondary" type="reset">
              Reset
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    )),
);
