import type { AnchorHTMLAttributes } from "react";
import { Text } from "../atoms/Text";
import { link } from "./Link.css";

export const Link = Text.as(AnchorWithFallback).attrs({ className: link });

// Rendering anchor tags without href results in uncrawlable links, which is poor SEO.

function AnchorWithFallback(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const Component = props.href ? "a" : "span";
  return <Component {...props} />;
}
