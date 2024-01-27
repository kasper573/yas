import type { ZodType } from "zod";
import { ZodIntersection, ZodObject } from "zod";
import { normalizeType } from "./normalizeType";

export function typeAtPath(type: ZodType, path: string[]): ZodType | undefined {
  if (path.length === 0) {
    return type;
  }

  type = normalizeType(type);

  if (type instanceof ZodObject) {
    const [first, ...rest] = path;
    type = type.shape[first];
    if (!rest.length) {
      return type;
    }
    return typeAtPath(type, rest);
  }

  if (type instanceof ZodIntersection) {
    return (
      typeAtPath(type._def.left, path) || typeAtPath(type._def.right, path)
    );
  }

  // Should never happen (if it happens there's a flaw in the implementation)
  throw new Error(`Unsupported zod type: ${type.constructor.name}`);
}
