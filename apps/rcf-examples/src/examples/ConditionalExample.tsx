import { z } from "zod";
import { BaseForm } from "../BaseForm";
import { ExampleContent } from "../ExampleContent";
import { SingleSelectField, valueOptions } from "../fields/SingleSelectField";

const kindType = z.enum(["foo", "bar"]);

const fooSchema = z.object({
  kind: z.literal("foo"),
  foo: z.string(),
});

const barSchema = z.object({
  kind: z.literal("bar"),
  bar: z.string(),
});

const paymentType = z.enum(["card", "paypal"]);

const cardSchema = z.object({
  type: z.literal("card"),
  number: z.string(),
  expiry: z.string(),
});

const paypalSchema = z.object({
  type: z.literal("paypal"),
  email: z.string(),
});

const paymentSchema = z
  .object({ owner: z.string() })
  .and(z.discriminatedUnion("type", [cardSchema, paypalSchema]));

const PaymentForm = BaseForm.extend((options) =>
  options
    .schema(paymentSchema)
    .type(paymentType, SingleSelectField, {
      options: valueOptions(paymentType.options),
    })
    .type(paymentType, SingleSelectField, {
      options: valueOptions(paymentType.options),
    }),
);

export function ConditionalExample() {
  return (
    <ExampleContent>
      {(props) => <PaymentForm title="Conditional" {...props} />}
    </ExampleContent>
  );
}
