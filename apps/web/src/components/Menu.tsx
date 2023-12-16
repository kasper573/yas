import { Stack } from "@yas/ui";
import { NavLink } from "./NavLink";

export function Menu() {
  return (
    <Stack direction="row" gap="3">
      <NavLink to="/">Sandbox</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </Stack>
  );
}
