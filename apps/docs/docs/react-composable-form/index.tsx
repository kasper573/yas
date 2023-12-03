import { z } from "@yas/validate";
import { createForm } from "react-composable-form";
import { TextField, NumberField, Button, Stack } from "@yas/ui";
// ---cut---

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
      <form onReset={reset} onSubmit={handleSubmit} style={styles.grid}>
        <Stack gap="3">
          <Email fullWidth />
          <Password fullWidth />
          <Age fullWidth />
        </Stack>
        <div className="button-group padding-top--md" style={styles.dockRight}>
          <Button color="secondary" type="reset">
            Reset
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    )),
);

// ---cut-after---

const styles = {
  grid: { display: "grid", minWidth: 250 },
  dockRight: { marginLeft: "auto" },
};
