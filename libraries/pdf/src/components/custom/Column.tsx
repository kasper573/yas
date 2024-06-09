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

export type ColumnProps = { children?: ReactNode } & ComponentProps<
  typeof View
> &
  ColumnVariants;

export const Column = styled<ColumnProps>(
  ({ children, style, gap, ...rest }) => {
    const finalStyle: ReactPDFStyle = {
      flexDirection: "column",
      ...resolveVariantStyle(rolumnVariantsDef, { gap }),
      ...(style as ReactPDFStyle),
    };
    return (
      <View style={finalStyle} {...rest}>
        {children}
      </View>
    );
  },
);

export type ColumnVariants = VariantSelections<typeof rolumnVariantsDef>;

const rolumnVariantsDef = defineVariants({
  gap: mapValues(tokens.space, (_, gap) => ({ gap })),
});
