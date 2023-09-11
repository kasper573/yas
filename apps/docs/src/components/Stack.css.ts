import { css } from "@yas/ui";

export const stack = css.style({
  display: "flex",
});

export const row = css.style({
  flexDirection: "row",
});

export const column = css.style({
  flexDirection: "column",
});

export const gap: Record<number, string> = {};

for (let i = 1; i <= 8; i++) {
  gap[i] = css.style({
    gap: i * 8,
  });
}
