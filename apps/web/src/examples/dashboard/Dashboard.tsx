import { styled } from "@yas/style";
import {
  Avatar,
  DatePicker,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
} from "@yas/ui";
import { Suspense } from "react";
import { formatISO, startOfToday } from "@yas/time";
import { api } from "@yas/api-client";
import { useRouterState } from "../../hooks/useRouterState";
import { Card } from "./shared";
import { Title } from "./Title";
import { DashboardContent, DashboardSkeleton } from "./DashboardContent";
import { SearchForm } from "./SearchForm";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useRouterState("date", dateEncoding);
  const [search, setSearch] = useRouterState("search");
  const searchResult = api.example.users.useQuery(search);

  function performNewSearch(newSearch?: string) {
    setSearch(newSearch);
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
        <SearchForm
          isLoading={searchResult.isLoading}
          onSubmit={performNewSearch}
        >
          <List>
            {searchResult.data?.map((user, index) => (
              <ListItem button key={index} sx={{ px: "#5" }}>
                <ListItemIcon>
                  <Avatar alt={`${user.name} avatar`} src={user.avatarUrl} />
                </ListItemIcon>
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItem>
            ))}
          </List>
        </SearchForm>
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

const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});

const dateEncoding = {
  decode: (value?: string): Date => (value ? new Date(value) : startOfToday()),
  encode: (value: Date): string => formatISO(value, { representation: "date" }),
};
