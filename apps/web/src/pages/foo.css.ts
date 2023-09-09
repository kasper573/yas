import { css } from "@yas/ui";

export const myVar = css.createVar("foobar");

export const container = css.style({
  padding: myVar,
});
