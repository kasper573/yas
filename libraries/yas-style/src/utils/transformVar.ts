import { createVar, fallbackVar } from "@vanilla-extract/css";

export type CSSVar = ReturnType<typeof createVar>;

export function createTransformVar(): TransformVar {
  return {
    rotate: createVar(),
    scale: createVar(),
    translate: createTranslateVar(),
  };
}

export function createTranslateVar(): TranslateVar {
  return {
    x: createVar(),
    y: createVar(),
    z: createVar(),
  };
}

export interface TransformVar {
  rotate: CSSVar;
  scale: CSSVar;
  translate: TranslateVar;
}

export interface TranslateVar {
  x: CSSVar;
  y: CSSVar;
  z: CSSVar;
}

export function cssTranslate({ x, y, z }: TranslateVar): string {
  const translateArg = [x, y, z].map((v) => fallbackVar(v, "0px")).join(",");
  return `translate3d(${translateArg})`;
}

export function cssTransform(t: TransformVar): string {
  return [
    cssTranslate(t.translate),
    `scale(${fallbackVar(t.scale, "1")})`,
    `rotate(${fallbackVar(t.rotate, "0deg")})`,
  ].join(" ");
}
