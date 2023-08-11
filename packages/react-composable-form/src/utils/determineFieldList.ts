import type { ZodType } from "zod";
import {
  z,
  ZodDiscriminatedUnion,
  ZodEffects,
  ZodIntersection,
  ZodLiteral,
  ZodObject,
} from "zod";
import type {
  FieldNames,
  FormSchema,
  inferFieldType,
  inferValue,
} from "../types/commonTypes";

export function determineFieldList<Schema extends FormSchema>(
  schema: Schema,
): FieldInfo<Schema>[] {
  const fields: FieldInfo<Schema>[] = [];
  enumerateType(stripEffects(schema), (type) => {
    if (type instanceof ZodObject) {
      for (const fieldName in type.shape) {
        fields.push({
          componentName: capitalize(fieldName),
          name: fieldName as never,
          type: type.shape[fieldName],
          isActive: () => true,
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
        isActive: () => true,
      });

      for (const [optionValue, option] of optionsMap.entries()) {
        for (const fieldName in option.shape) {
          if (fieldName !== discriminator) {
            fields.push({
              componentName: capitalize(fieldName),
              name: fieldName as never,
              type: option.shape[fieldName] as never,
              isActive: (values) => optionValue === values[discriminator],
            });
          }
        }
      }
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

export interface FieldInfo<
  Schema extends FormSchema = FormSchema,
  FieldName extends FieldNames<Schema> = FieldNames<Schema>,
> {
  name: FieldName;
  type: inferFieldType<Schema, FieldName>;
  isActive: (fieldValues: inferValue<Schema>) => boolean;
  componentName: Capitalize<FieldName>;
}
