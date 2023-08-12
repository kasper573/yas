import type { ZodType } from "zod";
import {
  z,
  ZodDiscriminatedUnion,
  ZodEffects,
  ZodIntersection,
  ZodLiteral,
  ZodObject,
  ZodUnion,
} from "zod";
import type {
  FieldNames,
  FormSchema,
  inferFieldType,
  inferValue,
} from "../types/commonTypes";
import type { FieldConditionsSelector } from "../types/optionTypes";

export interface FieldInfo<
  Schema extends FormSchema = FormSchema,
  FieldName extends FieldNames<Schema> = FieldNames<Schema>,
> {
  name: FieldName;
  type: inferFieldType<Schema, FieldName>;
  isActive: (fieldValues: inferValue<Schema>) => boolean;
  componentName: Capitalize<FieldName>;
}

export function determineFields<Schema extends FormSchema>(
  schema: Schema,
  realSelectConditions: FieldConditionsSelector<Schema>,
): FieldInfo<Schema>[] {
  const fields: FieldInfo<Schema>[] = [];
  const selectConditions = memoize(realSelectConditions);
  enumerateType(stripEffects(schema), (type) => {
    if (type instanceof ZodObject) {
      for (const key in type.shape) {
        const fieldName = key as FieldNames<Schema>;
        fields.push({
          componentName: capitalize(fieldName),
          name: fieldName,
          type: type.shape[fieldName],
          isActive: (values) => selectConditions(values)[fieldName] ?? true,
        });
      }
    } else if (type instanceof ZodDiscriminatedUnion) {
      const { optionsMap, discriminator } = type._def;
      const options = Array.from(optionsMap.values());

      const discriminatorType = z.enum(
        options.map((o) => {
          const d = o.shape[discriminator];
          if (d instanceof ZodLiteral) {
            return d._def.value;
          }
          throw new Error("Discriminator must be a literal.");
        }) as [string, ...string[]],
      );

      fields.push({
        componentName: capitalize(discriminator),
        name: discriminator,
        type: discriminatorType as never,
        isActive: (values) => selectConditions(values)[discriminator] ?? true,
      });

      for (const [optionValue, option] of optionsMap.entries()) {
        for (const fieldName in option.shape) {
          if (fieldName !== discriminator) {
            fields.push({
              componentName: capitalize(fieldName) as never,
              name: fieldName as never,
              type: option.shape[fieldName] as never,
              isActive: (values) =>
                selectConditions(values)[discriminator] ??
                optionValue === values[discriminator],
            });
          }
        }
      }
    } else if (type instanceof ZodUnion) {
      throw new Error("RCF does not support union types");
    }
  });
  return fields;
}

function stripEffects(type: ZodType): ZodType {
  while (type instanceof ZodEffects) {
    type = type.innerType();
  }
  return type;
}

function enumerateType(type: ZodType, handler: (type: ZodType) => void) {
  handler(type);
  if (type instanceof ZodIntersection) {
    enumerateType(type._def.left, handler);
    enumerateType(type._def.right, handler);
  }
}

function capitalize<S extends string>(str: S): Capitalize<S> {
  return (str[0].toUpperCase() + str.slice(1)) as Capitalize<S>;
}

function memoize<Fn extends (input: Input) => Output, Input, Output>(
  fn: Fn,
): Fn {
  let hasInitialized = false;
  let memoizedInput: Input;
  let memoizedOutput: Output;
  return ((input) => {
    if (hasInitialized && input === memoizedInput) {
      return memoizedOutput;
    }
    memoizedInput = input;
    memoizedOutput = fn(input);
    hasInitialized = true;
    return memoizedOutput;
  }) as Fn;
}
