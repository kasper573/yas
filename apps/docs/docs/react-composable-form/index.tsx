import { z } from "@yas/zod";
import { createForm } from "react-composable-form";
import { TextField, NumberField, Button } from "@yas/ui";
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
        <Email style={styles.leanLeft} />
        <Password style={styles.leanRight} />
        <Age />
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
  grid: { display: "grid" },
  dockRight: { marginLeft: "auto" },
  leanLeft: { transformOrigin: "left", transform: "rotateZ(-10deg)" },
  leanRight: {
    transformOrigin: "right",
    transform: "rotateZ(10deg)",
    width: "50%",
    marginLeft: "auto",
  },
};
