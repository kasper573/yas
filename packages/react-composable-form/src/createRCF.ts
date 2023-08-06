import type { FormComponent } from "./createForm";
import { createForm } from "./createForm";
import type {
  EmptyFormOptionsGenerics,
  FormOptionsBuilderFactory,
} from "./FormOptionsBuilder";
import type { AnyProps } from "./types/utilityTypes";
import type {
  AnyRCFGenerics,
  FieldProps,
  FormLayoutProps,
} from "./types/optionTypes";
import type { FieldComponentsForProps } from "./types/optionTypes";
import type { AnyRCFGenericsForFieldProps } from "./types/optionTypes";

export function createRCF<FieldProps extends AnyProps = {}>() {
  return function createFormForFieldProps<
    G extends AnyRCFGenericsForFieldProps<FieldProps>,
  >(
    reduceOptions?: FormOptionsBuilderFactory<EmptyFormOptionsGenerics, G>,
  ): FormComponent<G> {
    return createForm(reduceOptions);
  };
}

export type inferFieldProps<
  FormFactory,
  Value = any,
> = FormFactory extends typeof createForm<infer G extends AnyRCFGenerics>
  ? FieldProps<Value> & G["baseFieldProps"]
  : never;

export type inferLayoutProps<FormFactory> =
  FormFactory extends typeof createForm<infer G extends AnyRCFGenerics>
    ? FormLayoutProps<
        G["schema"],
        FieldComponentsForProps<inferFieldProps<FormFactory>>
      >
    : never;
