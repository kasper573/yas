import type { AnchorHTMLAttributes } from "react";
import { styled } from "@yas/style";
import { link } from "./Link.css";

export const Link = styled(AnchorWithFallback, link);

// Rendering anchor tags without href results in uncrawlable links, which is poor SEO.

function AnchorWithFallback(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const Component = props.href ? "a" : "span";
  return <Component {...props} />;
}
