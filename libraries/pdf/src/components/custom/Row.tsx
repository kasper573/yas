import type { ComponentProps, ReactNode } from "react";
import { mapValues, tokens } from "@yas/design-tokens";
import { View } from "@react-pdf/renderer";
import { styled } from "../../utils/createComponent";
import type { ReactPDFStyle } from "../../utils/resolvePDFStyle";
import type { VariantSelections } from "../../utils/resolveVariantStyle";
import {
  defineVariants,
  resolveVariantStyle,
} from "../../utils/resolveVariantStyle";

export type RowProps = { children?: ReactNode } & ComponentProps<typeof View> &
  RowVariants;

export const Row = styled<RowProps>(
  ({ children, style, inline, align, justify, wrap, gap, ...rest }) => {
    const finalStyle: ReactPDFStyle = {
      flexDirection: "row",
      ...resolveVariantStyle(
        rowVariantsDef,
        { inline, align, justify, wrap, gap },
        defaultVariants,
      ),
      ...(style as ReactPDFStyle),
    };
    return (
      <View style={finalStyle} {...rest}>
        {children}
      </View>
    );
  },
);

export type RowVariants = VariantSelections<typeof rowVariantsDef>;

const rowVariantsDef = defineVariants({
  inline: {
    false: { width: "100%" },
    true: {},
  },
  align: {
    start: { alignItems: "flex-start" },
    center: { alignItems: "center" },
    end: { alignItems: "flex-end" },
    stretch: { alignItems: "stretch" },
  },
  justify: {
    start: { justifyContent: "flex-start" },
    center: { justifyContent: "center" },
    end: { justifyContent: "flex-end" },
    spaceBetween: { justifyContent: "space-between" },
  },
  wrap: {
    true: { flexWrap: "wrap" },
    false: { flexWrap: "nowrap" },
  },
  gap: mapValues(tokens.space, (_, gap) => ({ gap })),
});

const defaultVariants = {
  direction: "column",
  wrap: false,
  inline: false,
} as const;
