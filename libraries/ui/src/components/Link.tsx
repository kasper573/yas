import { styled } from "@yas/style";
import { createLinkComponent } from "@yas/router";
import { link } from "./Link.css";

export const Linklike = styled("span", link);

export const Link = createLinkComponent((component) => styled(component, link));
