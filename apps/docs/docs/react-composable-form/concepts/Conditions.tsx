import { z } from "@yas/validate";
import { SingleSelectField, NumberField, BaseForm, Stack } from "@yas/ui";
import { ExampleContent } from "../../../src/components/ExampleContent";

const kindType = z.enum(["foo", "bar"]);
const paymentType = z.enum(["card", "paypal"]);

function createDiscriminatingSchema() {
  const fooSchema = z.object({
    kind: z.literal("foo"),
    foo: z.string(),
  });

  const barSchema = z.object({
    kind: z.literal("bar"),
    bar: z.string(),
  });

  const cardSchema = z.object({
    type: z.literal("card"),
    number: z.string(),
    expiry: z.string(),
  });

  const paypalSchema = z.object({
    type: z.literal("paypal"),
    email: z.string(),
  });

  return z
    .object({ owner: z.string() })
    .and(z.discriminatedUnion("type", [cardSchema, paypalSchema]))
    .and(z.discriminatedUnion("kind", [fooSchema, barSchema]));
}

const DiscriminatedForm = BaseForm.extend((options) =>
  options
    .schema(createDiscriminatingSchema())
    .type(paymentType, SingleSelectField, {
      options: SingleSelectField.valueOptions(paymentType.options),
    })
    .type(kindType, SingleSelectField, {
      options: SingleSelectField.valueOptions(kindType.options),
    }),
);

const ConditionsForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        type: kindType,
        foo: z.string(),
        bar: z.number(),
      }),
    )
    .conditions((data) => ({
      foo: data.type === "foo",
      bar: data.type === "bar",
    }))
    .type(kindType, SingleSelectField, {
      options: SingleSelectField.valueOptions(kindType.options),
    }),
);

const currencyType = z.enum(["USD", "EUR", "SEK"]);
const RelatedForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        currency: currencyType,
        amount: z.number(),
      }),
    )
    .type(currencyType, SingleSelectField, {
      options: SingleSelectField.valueOptions(currencyType.options),
    })
    .field("amount", ({ fieldValues, name, ...props }) => (
      <NumberField name={`${name} ${fieldValues?.currency ?? ""}`} {...props} />
    )),
);

export default function ConditionalExample() {
  return (
    <ExampleContent>
      {(props) => (
        <Stack direction="column" sx={{ gap: "#7" }}>
          <DiscriminatedForm title="Discriminated" {...props} />

          <ConditionsForm title="Conditions" {...props} />

          <RelatedForm title="Related" {...props} />
        </Stack>
      )}
    </ExampleContent>
  );
}
