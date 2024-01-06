import { styled } from "@yas/style";
import {
  DatePicker,
  Divider,
  Link,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
  TextField,
} from "@yas/ui";
import { Suspense, useState } from "react";
import { formatISO, startOfToday } from "@yas/time";
import { useRouterState } from "../../hooks/useRouterState";
import { Card } from "./shared";
import { Title } from "./Title";
import { DashboardContent, DashboardSkeleton } from "./DashboardContent";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useRouterState("date", dateEncoding);
  const [search, setSearch] = useRouterState("search");
  const [searchInput, setSearchInput] = useState<string | undefined>();

  function performNewSearch(newSearch?: string) {
    setSearch(newSearch);
    setSearchInput(undefined);
  }

  return (
    <Card sx={{ p: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "#3", px: "#5" }}>
        <OrganizationSelect />
        <Tabs variant="text-highlight" sx={{ flex: 1 }}>
          {mainNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performNewSearch(searchInput);
          }}
        >
          <Search
            value={searchInput}
            onChange={setSearchInput}
            inputProps={{ placeholder: "Search..." }}
            clearable
          />
        </form>
        <UserMenu />
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "#5" }}>
        <Stack direction="row" justify="spaceBetween">
          <Title onClearSearch={search ? performNewSearch : undefined}>
            Dashboard{search ? ` for ${search}` : undefined}
          </Title>
          <DatePicker value={dateFilter} onChange={setDateFilter} />
        </Stack>
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent dateFilter={dateFilter} />
        </Suspense>
      </Stack>
    </Card>
  );
}

const Search = styled(TextField).attrs({ size: "small" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});

const dateEncoding = {
  decode: (value?: string): Date => (value ? new Date(value) : startOfToday()),
  encode: (value: Date): string => formatISO(value, { representation: "date" }),
};
