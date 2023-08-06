import { z } from "zod";
import { BaseForm } from "../BaseForm";
import { ExampleContent } from "../ExampleContent";
import { SingleSelectField, valueOptions } from "../fields/SingleSelectField";

const paymentType = z.enum(["PayPal", "Card"]);

const PaymentForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        owner: z.string(),
        paymentType,
      }),
    )
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
