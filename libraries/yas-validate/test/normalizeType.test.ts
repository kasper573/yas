import { describe, it, expect } from "@yas/test/vitest/node";
import { z } from "zod";
import { normalizeType } from "../src/normalizeType";

describe("normalizeType", () => {
  it("can normalize refines", () => {
    expect(normalizeType(z.string().refine(() => true))).toBeInstanceOf(
      z.ZodString,
    );
  });

  it("can normalize optional", () => {
    expect(normalizeType(z.string().optional())).toBeInstanceOf(z.ZodString);
  });

  it("can normalize nullable", () => {
    expect(normalizeType(z.string().nullable())).toBeInstanceOf(z.ZodString);
  });

  it("can normalize default", () => {
    expect(normalizeType(z.string().default("foo"))).toBeInstanceOf(
      z.ZodString,
    );
  });

  it("can normalize transform", () => {
    expect(normalizeType(z.string().transform(() => 123))).toBeInstanceOf(
      z.ZodString,
    );
  });
});
