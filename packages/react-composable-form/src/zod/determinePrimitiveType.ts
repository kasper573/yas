import type { FormValueType, PrimitiveType } from "../types/commonTypes";
import { getFirstPartyType } from "./getFirstPartyType";
import { normalizeType } from "./normalizeType";

export const determinePrimitiveType = (type: FormValueType): PrimitiveType =>
  getFirstPartyType(normalizeType(type));
