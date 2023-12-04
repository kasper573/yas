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
    .validateOn("change"),
);

export const CardLoginForm = LoginForm.extend((options) =>
  options.layout(CardLayout),
);

export const InlineLoginForm = LoginForm.extend((options) =>
  options.layout(InlineLayout),
);

export function CardLayout({
  // A form layout component is any React component that accepts FormLayoutProps.
  // For most layouts, these are the props you'll need (see source code docs for more information):
  fields,
  generalErrors,
  handleSubmit,
  reset,
  // You're free to add any additional props to your layout component.
  // You will be able to pass in these custom props when rendering the form.
  isLoading,
}: FormLayoutProps & { isLoading?: boolean }) {
  return (
    // The submit handler can be called manually or passed to a form element.
    <form className="card" onSubmit={handleSubmit}>
      <Stack className="card__body" gap="2">
        {/* 
          The layout will be given a record of React components that represents all the fields in the form.
          You could access them by name, but if you want your layout to be generic, that's usually unsafe,
          since then you'd assume that the form has a field with that name.
          Instead it's recommended to map over all the field components and render them:
        */}
        {Object.values(fields).map((Component, index) => (
          // These are the components you defined with `type` method in the form definition, but property defaults ensured.
          // This is possible since when constructing a form, fields have to be defined together with defaults for any required props.
          // Thanks to this design, it's always safe to render a field component without any props
          // (but you can still pass in any property overrides you want).
          <Component key={index} />
        ))}
        {/* General errors are errors that could not be assigned to a specific field */}
        {generalErrors.length > 0 && (
          <Alert severity="error" className="card__footer">
            {generalErrors.join(", ")}
          </Alert>
        )}
      </Stack>
      <Stack className="card__footer" direction="row" gap="2">
        {/* 
          Loading state is not built-in to the library, 
          but the layout system is flexible enough to make it trivial to implement manually:
        */}
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
  // Thanks to inference, Typescript is aware that the form contains an email and password field
  options.layout(({ fields: { Email, Password }, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Stack gap="2">
        {/* 
          Each field can be rendered by using the component matching its name.
          Place them wherever you please in your layout, and pass in any props you want.
          The props are type safe and specific to each fields component type.
        */}
        <Email name="Email (I am special)" />
        {/* 
          When you constructed your form, fields had to be defined together with defaults for all their required props.
          Thanks to this design, it's always safe to render a field without any props, since then their defaults will be used.
         */}
        <Password />
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
      <Stack direction="row" align="end" gap="2">
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
