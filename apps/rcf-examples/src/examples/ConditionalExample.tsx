import { z } from "zod";
import { BaseForm } from "../BaseForm";
import { ExampleContent } from "../ExampleContent";
import { SingleSelectField, valueOptions } from "../fields/SingleSelectField";

const cardSchema = z.object({
  type: z.literal("card"),
  number: z.string(),
  expiry: z.string(),
});

const paypalSchema = z.object({
  type: z.literal("paypal"),
  email: z.string(),
});

const paymentType = z.enum([
  cardSchema.shape.type.value,
  paypalSchema.shape.type.value,
]);

const paymentSchema = z
  .object({ owner: z.string() })
  .and(z.discriminatedUnion("type", [cardSchema, paypalSchema]));

const PaymentForm = BaseForm.extend((options) =>
  options.schema(paymentSchema).type(paymentType, SingleSelectField, {
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
