import type { ZodFirstPartyTypeKind } from "zod";
import { type AnyZodObject, type ZodType } from "zod";
import {
  z,
  ZodAny,
  ZodArray,
  ZodBranded,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodIntersection,
  ZodLiteral,
  ZodNativeEnum,
  ZodNullable,
  ZodObject,
  ZodOptional,
  ZodTuple,
  ZodUnion,
} from "zod";
import { getBrand, monkeyPatchZodBranded } from "./monkeyPatchZodBranded";

// Required for ZodBranded comparisons to work
monkeyPatchZodBranded();

export function isMatchingType(_a: ZodType, _b?: ZodType): boolean {
  if (_a === _b) {
    return true;
  }

  if (!_b) {
    return false;
  }

  const a = normalizeType(_a);
  const b = normalizeType(_b);

  if (a === b) {
    return true;
  }

  if (a instanceof ZodAny || b instanceof ZodAny) {
    return true;
  }

  if (a instanceof ZodLiteral && b instanceof ZodLiteral) {
    return a._def.value === b._def.value;
  }

  if (a instanceof ZodEnum && b instanceof ZodEnum) {
    return isReferenceIntersection(a._def.values, b._def.values);
  }

  if (a instanceof ZodNativeEnum && b instanceof ZodNativeEnum) {
    return a._def.values === b._def.values;
  }

  if (a instanceof ZodObject && b instanceof ZodObject) {
    return isStructuralIntersection(a, b);
  }

  if (a instanceof ZodTuple && b instanceof ZodTuple) {
    return isSameSet(a._def.items, b._def.items, isMatchingType);
  }

  if (a instanceof ZodArray && b instanceof ZodArray) {
    return isMatchingType(a._def.type, b._def.type);
  }

  if (a instanceof ZodBranded && b instanceof ZodBranded) {
    return (
      getBrand(a) === getBrand(b) && isMatchingType(a._def.type, b._def.type)
    );
  }

  return getFirstPartyType(a) === getFirstPartyType(b);
}

function isSameSet<T>(
  a: T[],
  b: T[],
  isEqual: (i1: T, i2?: T) => boolean,
): boolean {
  return (
    a.length === b.length && a.every((item, index) => isEqual(item, b[index]))
  );
}

function isStructuralIntersection(a: AnyZodObject, b: AnyZodObject): boolean {
  return Object.keys(b.shape).every((key) =>
    isMatchingType(b.shape[key], a.shape[key]),
  );
}

function isReferenceIntersection<T>(a: T[], b: T[]): boolean {
  return b.every((item) => a.includes(item));
}

export function getFirstPartyType(type: ZodType): ZodFirstPartyTypeKind {
  if ("typeName" in type._def) {
    return type._def.typeName as ZodFirstPartyTypeKind;
  }
  throw new Error(`Could not determine first party type`);
}

function normalizeType(type: ZodType): ZodType {
  while (
    type instanceof ZodEffects ||
    type instanceof ZodOptional ||
    type instanceof ZodNullable ||
    type instanceof ZodDefault ||
    type instanceof ZodIntersection
  ) {
    if (type instanceof ZodIntersection) {
      type = flattenObjectIntersection(type);
    } else {
      type =
        type instanceof ZodEffects ? type.innerType() : type._def.innerType;
    }
  }
  if (type instanceof ZodUnion) {
    throw new Error(`RCF does not support union types`);
  }
  return type;
}

function flattenObjectIntersection(
  type: ZodIntersection<any, any>,
): AnyZodObject {
  const { left, right } = type._def;
  if (left instanceof ZodObject && right instanceof ZodObject) {
    return z.object({
      ...left._def.shape,
      ...right._def.shape,
    });
  }
  throw new Error(`RCF does not support intersections of non-objects`);
}
