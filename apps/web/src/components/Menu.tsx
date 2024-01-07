import { TabItem, Tabs } from "@yas/ui";
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";

const exampleRoutes = [
  { to: "/", label: "Sandbox" },
  { to: "/dashboard", label: "Dashboard" },
];

export function Menu() {
  const location = useLocation();
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
