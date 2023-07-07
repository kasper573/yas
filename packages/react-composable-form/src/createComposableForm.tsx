import type { ComponentType } from "react";
import type {
  AnyZodObject,
  ZodRawShape,
  ZodType,
  ZodFirstPartyTypeKind,
} from "zod";
import { useMemo } from "react";
import { ZodDefault, ZodEffects, ZodNullable, ZodOptional } from "zod";

export function createComposableForm(
  options: ComposableFormOptions = {},
): ComposableForm {
  const { layout: DefaultLayout = NoLayout, components: build } = options;

  const typeComponents = new Map<ZodType, FormField>();
  const fieldComponents = new Map<string, FormField>();

  build?.(createBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    schema,
    children: inlineLayout,
  }: ComposableFormProps) {
    const fields = useMemo(
      () => deriveFormFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return inlineLayout ? (
      inlineLayout({ fields })
    ) : (
      <DefaultLayout fields={fields} />
    );
  }

  ComposableForm.extend = (extension: ComposableFormOptions): ComposableForm =>
    createComposableForm(mergeOptions(options, extension));

  return ComposableForm;
}

function NoLayout({ fields }: FormLayoutProps) {
  return (
    <>
      {Object.values(fields).map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  );
}

function deriveFormFields(
  typeMap: Map<ZodType, FormField>,
  fieldMap: Map<string, FormField>,
  schema?: AnyZodObject,
): FormFields {
  return Object.entries((schema?.shape ?? {}) as ZodRawShape).reduce(
    (fields, [name, type]) => {
      const Component = fieldMap.get(name) ?? findMatchingType(typeMap, type);
      if (!Component) {
        throw new Error(
          `No component available for field "${name}" or type ${describeType(
            type,
          )}`,
        );
      }
      fields[capitalize(name)] = embedDefaultProps(Component, name);
      return fields;
    },
    {} as FormFields,
  );
}

function findMatchingType(map: Map<ZodType, FormField>, type: ZodType) {
  for (const [candidate, Component] of map.entries()) {
    if (isMatchingType(candidate, type)) {
      return Component;
    }
  }
}

function isMatchingType(a: ZodType, b: ZodType): boolean {
  if (a === b) {
    return true;
  }
  const n1 = normalizeType(a);
  const n2 = normalizeType(b);
  if (n1 === n2) {
    return true;
  }
  return firstPartyType(n1) === firstPartyType(n2);
}

function normalizeType(type: ZodType): ZodType {
  while (
    type instanceof ZodEffects ||
    type instanceof ZodOptional ||
    type instanceof ZodNullable ||
    type instanceof ZodDefault
  ) {
    type = type instanceof ZodEffects ? type.innerType() : type._def.innerType;
  }
  return type;
}

function firstPartyType(type: ZodType): ZodFirstPartyTypeKind {
  if ("typeName" in type._def) {
    return type._def.typeName as ZodFirstPartyTypeKind;
  }
  throw new Error(`Could not determine first party type`);
}

function embedDefaultProps(
  Component: FormField,
  name: string,
): FormFieldWithEmbeddedDefaultProps {
  return function FormFieldWithDefaultProps(props: Partial<FormFieldProps>) {
    return <Component name={name} {...props} />;
  };
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function describeType(type: ZodType): string {
  if ("typeName" in type._def) {
    return String(type._def.typeName);
  }
  return String(type);
}

function mergeOptions(
  a: ComposableFormOptions,
  b: ComposableFormOptions,
): ComposableFormOptions {
  return {
    layout: b.layout ?? a.layout,
    components(builder) {
      a.components?.(builder);
      b.components?.(builder);
      return builder;
    },
  };
}

function createBuilder(
  typeMap: Map<ZodType, FormField>,
  fieldMap: Map<string, FormField>,
): FormComponentBuilder {
  const builder: FormComponentBuilder = {
    type(type, component) {
      typeMap.set(type, component);
      return builder;
    },
    field(name, component) {
      fieldMap.set(name, component);
      return builder;
    },
  };
  return builder;
}

export interface ComposableFormOptions {
  layout?: FormLayout;
  components?: FormComponentFactory;
}

/**
 * Not a ComponentType to be able to be used as non-memoized inline render prop
 */
export type InlineFormLayout = (props: FormLayoutProps) => JSX.Element;

export type ComposableFormProps = {
  schema?: AnyZodObject;
  children?: InlineFormLayout;
};

export type ComposableForm = ComponentType<ComposableFormProps> & {
  extend(options: ComposableFormOptions): ComposableForm;
};

export type FormLayoutProps = {
  fields: FormFields;
};

export type FormLayout = ComponentType<FormLayoutProps>;

export type FormFieldProps = { name: string };

export type FormFields = Record<string, FormFieldWithEmbeddedDefaultProps>;
export type FormField = ComponentType<FormFieldProps>;
export type FormFieldWithEmbeddedDefaultProps = ComponentType<
  Partial<FormFieldProps>
>;

export type FormComponentFactory = (
  builder: FormComponentBuilder,
) => FormComponentBuilder;

export type FormComponentBuilder = {
  type(type: ZodType, component: FormField): FormComponentBuilder;
  field(name: string, component: FormField): FormComponentBuilder;
};
