import type { ZodType } from "zod";
import { ZodIntersection, ZodObject } from "zod";
import { normalizeType } from "./normalizeType";

export function typeAtPath(
  type: ZodType,
  path: readonly string[],
): ZodType | undefined {
  if (path.length === 0) {
    return type;
  }

  type = normalizeType(type);

  if (type instanceof ZodObject) {
    const [first, ...rest] = path;
    return typeAtPath(type.shape[first], rest);
  }

  if (type instanceof ZodIntersection) {
    return (
      typeAtPath(type._def.left, path) || typeAtPath(type._def.right, path)
    );
  }

  throw new Error(`Unsupported zod type: ${type.constructor.name}`);
}
