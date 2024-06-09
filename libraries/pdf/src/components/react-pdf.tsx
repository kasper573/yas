import * as ReactPDF from "@react-pdf/renderer";
import type { ComponentType } from "react";
import { styled } from "../utils/createComponent";

export { pdf } from "@react-pdf/renderer";

export const PDFViewer = styled(ReactPDF.PDFViewer);
export const Document = styled(ReactPDF.Document);
export const Page = styled(ReactPDF.Page, {
  sx: {
    typography: "body",
    backgroundColor: "surface.base",
    color: "surface.face",
  },
});
export const View = styled(ReactPDF.View);
export const Image = styled(ReactPDF.Image as ComponentType<{ src: string }>);
export const Text = styled(ReactPDF.Text);
export const Canvas = styled(ReactPDF.Canvas);
export const Link = styled(ReactPDF.Link);
export const Note = styled(ReactPDF.Note);
export const Svg = styled(ReactPDF.Svg);
export const Line = styled(ReactPDF.Line);
export const Polyline = styled(ReactPDF.Polyline);
export const Polygon = styled(ReactPDF.Polygon);
export const Path = styled(ReactPDF.Path);
export const Rect = styled(ReactPDF.Rect);
export const Circle = styled(ReactPDF.Circle);
export const Ellipse = styled(ReactPDF.Ellipse);
export const Tspan = styled(ReactPDF.Tspan);
export const G = styled(ReactPDF.G);
export const Stop = styled(ReactPDF.Stop);
export const Defs = styled(ReactPDF.Defs);
export const ClipPath = styled(ReactPDF.ClipPath);
export const LinearGradient = styled(ReactPDF.LinearGradient);
export const RadialGradient = styled(ReactPDF.RadialGradient);
