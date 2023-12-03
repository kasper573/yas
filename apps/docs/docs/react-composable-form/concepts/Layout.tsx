import { z } from "@yas/validate";
import { Button, Stack } from "@yas/ui";
import type { FormLayoutProps } from "@yas/ui";
import { createForm, TextField, Alert } from "@yas/ui";

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
    .layout(CardLayout),
);

export const InlineLoginForm = LoginForm.extend((options) =>
  options.layout(InlineLayout),
);

export function CardLayout({
  fields,
  generalErrors,
  handleSubmit,
  reset,
  isLoading,
}: FormLayoutProps & { isLoading?: boolean }) {
  return (
    <form className="card" onSubmit={handleSubmit}>
      <Stack className="card__body">
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
        {generalErrors.length > 0 && (
          <Alert severity="error" className="card__footer">
            {generalErrors.join(", ")}
          </Alert>
        )}
      </Stack>
      <Stack className="card__footer" direction="row">
        <span style={{ flex: 1 }}>{isLoading ? <>Loading...</> : null}</span>
        <Button variant="outlined" onClick={reset}>
          Reset
        </Button>
        <Button variant="contained" disabled={isLoading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export const SpecializedLoginForm = LoginForm.extend((options) =>
  options.layout(({ fields: { Email, Password }, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Email style={{ background: "#5b1111" }} />
        <Password name="PWD (I am special)" style={{ background: "#272878" }} />
        <Button type="submit">Very special submit</Button>
      </Stack>
    </form>
  )),
);

export function InlineLayout({
  fields,
  generalErrors,
  handleSubmit,
}: FormLayoutProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" align="end">
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </Stack>
      {generalErrors.length > 0 && (
        <Alert severity="error">{generalErrors.join(", ")}</Alert>
      )}
    </form>
  );
}
