import { TabItem, Tabs } from "@yas/ui";
import { useRouterState } from "@yas/router";
import { NavLink } from "./NavLink";

const exampleRoutes = [
  { to: "/", label: "Sandbox" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Menu() {
  const { location } = useRouterState();
  return (
    <Tabs>
      {exampleRoutes.map(({ to, label }, index) => (
        <TabItem asChild key={index} active={to === location.pathname}>
          <NavLink to={to}>{label}</NavLink>
        </TabItem>
      ))}
    </Tabs>
  );
}
