import { styled } from "@yas/style";
import { Divider, Stack as StackImpl, Text } from "@yas/ui";
import { outline } from "./Dashboard.css";

export function Dashboard() {
  return (
    <Outlined>
      <Stack direction="row" sx={{ mt: rowGap, px: columnGap }}>
        <OrganizationSelect />
        <NavMenu sx={{ flex: 1 }} />
        <Search />
        <UserMenu />
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1 }}>
        <Title />
        <Tabs />
        <Stack direction="row">
          <Stats />
          <Stats />
          <Stats />
          <Stats />
        </Stack>
        <Stack direction="row">
          <Graph />
          <RecentSales />
        </Stack>
      </Stack>
    </Outlined>
  );
}

const rowGap = "#3" as const;
const columnGap = "#5" as const;
const Stack = styled(StackImpl).attrs({ columnGap, rowGap });
const Outlined = styled(Stack).attrs({ className: outline });
const NavMenu = styled(Text).attrs({ children: "NavMenu" });
const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ children: "Title" });
const Tabs = styled(Text).attrs({ children: "Tabs" });
const Stats = styled(Text).attrs({ children: "Stats" });
const Graph = styled(Text).attrs({ children: "Graph" });
const RecentSales = styled(Text).attrs({ children: "RecentSales" });
const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
