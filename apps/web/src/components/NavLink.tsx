import { Link as NavLinkImpl } from "@yas/router";
import { Link } from "@yas/ui";

// Asserting typedef to retain the generic constraints of the router Link.
// It loses the @yas/ui typedefs, but that's fine since we barely use them.
export const NavLink = Link.as(NavLinkImpl) as typeof NavLinkImpl;
