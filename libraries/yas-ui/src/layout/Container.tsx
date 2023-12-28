import { styled } from "@yas/style";
import { container } from "./Container.css";

/**
 * Responsive container.
 *
 * Limits its width to the most suitable breakpoint for the current window size.
 */
export const Container = styled("div", container);
