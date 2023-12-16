import type { NavLinkProps } from "react-router-dom";
import { NavLink as NavLinkImpl } from "react-router-dom";
import { Link } from "@yas/ui";

export function NavLink(props: NavLinkProps) {
  return <Link as={NavLinkImpl} asProps={props} />;
}
