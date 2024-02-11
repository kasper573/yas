import { describe, it, expect } from "@yas/test/vitest/node";
import { z } from "zod";
import { underlyingType } from "../src/underlyingType";

describe("underlyingType", () => {
  it("can ignore refines", () => {
    expect(underlyingType(z.string().refine(() => true))).toBeInstanceOf(
      z.ZodString,
    );
  });

  it("can ignore optional", () => {
    expect(underlyingType(z.string().optional())).toBeInstanceOf(z.ZodString);
  });

  it("can ignore nullable", () => {
    expect(underlyingType(z.string().nullable())).toBeInstanceOf(z.ZodString);
  });

  it("can ignore default", () => {
    expect(underlyingType(z.string().default("foo"))).toBeInstanceOf(
      z.ZodString,
    );
  });

  it("can ignore transform", () => {
    expect(underlyingType(z.string().transform(() => 123))).toBeInstanceOf(
      z.ZodString,
    );
  });
});
