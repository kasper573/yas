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
    G extends AnyRCFGenericsForFieldProps<FieldProps>
  >(
    reduceOptions?: FormOptionsBuilderFactory<EmptyFormOptionsGenerics, G>
  ): FormComponent<G> {
    return createForm(reduceOptions);
  };
}

type FormFactoryLike<G extends AnyRCFGenerics> = () => FormComponent<G>;

export type inferFieldProps<
  FormFactory,
  Value = unknown
> = FormFactory extends FormFactoryLike<infer G>
  ? FieldProps<Value> & G["baseFieldProps"]
  : never;

export type inferLayoutProps<FormFactory> = FormFactory extends FormFactoryLike<
  infer G
>
  ? FormLayoutProps<
      G["schema"],
      FieldComponentsForProps<inferFieldProps<FormFactory>>
    >
  : never;
