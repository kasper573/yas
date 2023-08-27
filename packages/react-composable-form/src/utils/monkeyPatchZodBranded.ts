import type { ZodBranded, ZodTypeAny } from "zod";
import { ZodType } from "zod";

export function monkeyPatchZodBranded() {
  const originalBrand = ZodType.prototype.brand;
  ZodType.prototype.brand = function monkeyPatchedBrand(brand) {
    const branded = originalBrand.call(this, brand);
    setBrand(branded, brand);
    return branded;
  };
  function restore() {
    ZodType.prototype.brand = originalBrand;
  }
  return restore;
}

export function getBrand<T extends ZodTypeAny, B extends PropertyKey>(
  type: ZodBranded<T, B>
): B {
  // @ts-expect-error Reading a property that is not part of the zod API
  return type._def[brandStorageProperty];
}

const brandStorageProperty = Symbol("brandStorageProperty");

function setBrand<T extends ZodTypeAny, B extends PropertyKey>(
  type: ZodBranded<T, B>,
  brand?: B
) {
  // @ts-expect-error Writing a property that is not part of the zod API
  type._def[brandStorageProperty] = brand;
}
