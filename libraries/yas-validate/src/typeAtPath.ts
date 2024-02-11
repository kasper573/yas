import type { ZodType } from "zod";
import { ZodIntersection, ZodObject, ZodUnion } from "zod";
import { underlyingType } from "./underlyingType";

export function typeAtPath(
  type: ZodType,
  path: readonly string[],
): ZodType | undefined {
  if (path.length === 0) {
    return type;
  }

  type = underlyingType(type);

  if (type instanceof ZodObject) {
    const [first, ...rest] = path;
    return typeAtPath(type.shape[first], rest);
  }

  if (type instanceof ZodIntersection) {
    return (
      typeAtPath(type._def.left, path) || typeAtPath(type._def.right, path)
    );
  }

  if (type instanceof ZodUnion) {
    for (const option of type._def.options) {
      const result = typeAtPath(option, path);
      if (result) {
        return result;
      }
    }
    return;
  }

  throw new Error(`Unsupported zod type: ${type.constructor.name}`);
}
