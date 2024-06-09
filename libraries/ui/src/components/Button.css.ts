import { tokens } from "@yas/design-tokens";
import { recipe, atoms, theme, createVar } from "@yas/style";

const heightVar = createVar("buttonHeight");
const horizontalPaddingVar = createVar("buttonPaddingX");

export const buttonRecipe = recipe({
  base: [
    atoms({
      all: "unset",
      gap: "l",
      overflow: "visible",
      textAlign: "inherit",
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "appearance.standard.enter",
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    }),
    {
      height: heightVar,
      paddingLeft: horizontalPaddingVar,
      paddingRight: horizontalPaddingVar,
    },
  ],
  variants: {
    size: {
      medium: [
        atoms({ typography: "label" }),
        {
          vars: {
            [heightVar]: "40px",
            [horizontalPaddingVar]: `${tokens.space.xl}px`,
          },
        },
      ],
    },
    round: {
      true: [
        atoms({ borderRadius: "circle" }),
        {
          width: heightVar,
          boxSizing: "border-box",
          vars: {
            [horizontalPaddingVar]: `${tokens.space.l}px`,
          },
        },
      ],
      false: atoms({ borderRadius: "m" }),
    },
    intent: {
      primary: [
        atoms({
          backgroundColor: {
            default: "primary.base",
            hover: "primary.hover",
            active: "primary.active",
          },
          color: "primary.face",
        }),
        {
          selectors: {
            "&:focus-visible": borderStyle(),
          },
        },
      ],
      destructive: [
        atoms({
          backgroundColor: {
            default: "error.base",
            hover: "error.hover",
            active: "error.active",
          },
          color: "error.face",
        }),
        {
          selectors: {
            "&:focus-visible": borderStyle(),
          },
        },
      ],
      secondary: [
        atoms({
          backgroundColor: {
            default: "secondary.base",
            hover: "secondary.hover",
            active: "secondary.active",
          },
          color: "secondary.face",
        }),
        {
          selectors: {
            "&:focus-visible": borderStyle(),
          },
        },
      ],
      surface: [
        atoms({
          color: "surface.face",
          backgroundColor: {
            default: "surface.base",
            hover: "surface.hover",
            active: "surface.active",
          },
        }),
        borderStyle(theme.color.surface.face_subtle),
      ],
      outline: [
        atoms({
          color: {
            default: "surface.face",
            hover: "secondary.face",
            active: "secondary.face",
          },
          backgroundColor: {
            default: "transparent",
            focus: "secondary.hover",
            hover: "secondary.base",
            active: "secondary.active",
          },
        }),
        borderStyle(),
      ],
      text: [
        atoms({
          color: {
            default: "surface.face",
            hover: "secondary.face",
            active: "secondary.face",
          },
          backgroundColor: {
            default: "transparent",
            focus: "transparent",
            hover: "secondary.hover",
            active: "secondary.active",
          },
        }),
        {
          selectors: {
            "&:focus-visible": borderStyle(),
          },
        },
      ],
    },
    disabled: {
      true: atoms({
        pointerEvents: "none",
        opacity: 0.4,
      }),
    },
    fullWidth: {
      true: atoms({
        width: "100%",
      }),
      false: atoms({
        width: "min-content",
      }),
    },
  },
  defaultVariants: {
    size: "medium",
    intent: "primary",
    disabled: false,
    fullWidth: false,
    round: false,
  },
});

function borderStyle(color = theme.color.primary.base) {
  return {
    border: `1px solid ${tokens.color.white["87"]}`,
    outline: `1px solid ${color}`,
    height: `calc(${heightVar} - 2px)`,
    paddingLeft: `calc(${horizontalPaddingVar} - 1px)`,
    paddingRight: `calc(${horizontalPaddingVar} - 1px)`,
  };
}
