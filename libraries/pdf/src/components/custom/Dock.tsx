import type { ComponentProps, ReactNode } from "react";
import { View } from "@react-pdf/renderer";
import { styled } from "../../utils/createComponent";
import type { VariantSelections } from "../../utils/resolveVariantStyle";
import {
  defineVariants,
  resolveVariantStyle,
} from "../../utils/resolveVariantStyle";
import type { ReactPDFStyle } from "../../utils/resolvePDFStyle";

export type DockProps = { children?: ReactNode } & ComponentProps<typeof View> &
  DockVariants;

export const Dock = styled<DockProps>(
  ({ children, style, position, ...rest }) => {
    const finalStyle: ReactPDFStyle = {
      position: "absolute",
      ...resolveVariantStyle(dockVariantsDef, { position }, defaultVariants),
      ...(style as ReactPDFStyle),
    };
    return (
      <View style={finalStyle} {...rest}>
        {children}
      </View>
    );
  },
);

export type DockVariants = VariantSelections<typeof dockVariantsDef>;

const dockVariantsDef = defineVariants({
  position: {
    top: {
      top: 0,
      left: 0,
      right: 0,
    },
    topRight: {
      top: 0,
      right: 0,
    },
    right: {
      top: 0,
      right: 0,
      bottom: 0,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
    },
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
    },
    left: {
      top: 0,
      left: 0,
      bottom: 0,
    },
    topLeft: {
      top: 0,
      left: 0,
    },
    inset: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    center: {
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
    },
  },
});

const defaultVariants = { position: "inset" } as const;
