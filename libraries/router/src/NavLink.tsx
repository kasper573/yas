import { Link as TanstackRouterLink } from "@tanstack/react-router";
import { createContext, type ComponentProps, useContext } from "react";

/**
 * Identical to `@tanstack/react-router Link`, but can be given a class name via context.
 *
 * You can use this to apply the @yas/ui Link style to all NavLinks.
 * We use this approach so that @yas/router can be decoupled from @yas/ui.
 */
export const NavLink = NavLinkImpl as typeof TanstackRouterLink;

function NavLinkImpl({
  className,
  ...props
}: ComponentProps<typeof TanstackRouterLink>) {
  const { className: customClassName } = useContext(NavLinkContext);

  return (
    <TanstackRouterLink
      className={clsx(customClassName, className)}
      {...props}
    />
  );
}

const clsx = (...classNames: (string | undefined)[]): string | undefined =>
  classNames.filter(Boolean).join(" ") || undefined;

export interface NavLinkContextValue {
  className?: string;
}

export const NavLinkContext = createContext<NavLinkContextValue>({});
