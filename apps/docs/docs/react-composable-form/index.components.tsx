import { z } from "zod";
import { useState } from "react";
import type { inferFormValue } from "react-composable-form";
import { createForm } from "react-composable-form";
import { TextField } from "../../src/fields/TextField";
import { NumberField } from "../../src/fields/NumberField";
// ---cut---

const BaseForm = createForm((options) =>
  options
    // ^?
    .validateOn("blur", "submit")
    .type(z.string(), TextField)
    .type(z.number(), NumberField)
    .type(z.string().brand("password"), TextField, { type: "password" }),
);

const UserForm = BaseForm.extend((options) =>
  options
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
          <button className="button button--secondary" type="reset">
            Reset
          </button>
          <button className="button button--primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    )),
);

// ---cut-after---

export function App() {
  type FormState = inferFormValue<typeof UserForm>;
  const [current, setCurrent] = useState<FormState>();
  const [submitted, submit] = useState<FormState>();
  return (
    <>
      <h3>Form</h3>
      <UserForm value={current} onChange={setCurrent} onSubmit={submit} />

      <h3 style={{ marginTop: "1rem" }}>Current state</h3>
      <pre>{JSON.stringify(current, null, 2)}</pre>

      <h3 style={{ marginTop: "1rem" }}>Last submit</h3>
      <pre>{JSON.stringify(submitted, null, 2)}</pre>
    </>
  );
}

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
