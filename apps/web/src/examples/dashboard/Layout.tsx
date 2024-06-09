import { styled } from "@yas/style";
import {
  Avatar,
  CircularProgress,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack as StackImpl,
  TabItem,
  Tabs,
} from "@yas/ui";
import { Suspense, useState } from "react";
import { api, enabledWhenDefined } from "@yas/trpc-client";
import { useDebounce } from "@yas/hooks";
import { Outlet } from "@yas/router";
import { Card } from "../shared";
import { SearchForm } from "./SearchForm";

const dashboardLinks = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/customers", label: "Customers" },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/settings", label: "Settings" },
] as const;

export default function Layout() {
  const [searchInput, setSearchInput] = useState<string | undefined>();
  const debouncedSearchInput = useDebounce(searchInput, 333);

  const searchResult = api.dashboard.users.list.useQuery(
    ...enabledWhenDefined(debouncedSearchInput.value),
  );

  const isSearching =
    searchInput !== undefined &&
    (debouncedSearchInput.isDebouncing || searchResult.isFetching);

  return (
    <Card style={{ padding: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "l", px: "xl" }}>
        <Tabs intent="item-contained" sx={{ flex: 1 }}>
          {dashboardLinks.map(({ to, label }, index) => (
            <TabItem key={index} asChild>
              <Link to={to} activeOptions={{ exact: true }}>
                {label}
              </Link>
            </TabItem>
          ))}
        </Tabs>
        <SearchForm
          value={searchInput}
          onChange={setSearchInput}
          isLoading={isSearching}
        >
          {searchResult.data ? (
            <List style={{ minWidth: 200 }}>
              {searchResult.data.map((user, index) => (
                <ListItem asChild button key={index} sx={{ px: "xl" }}>
                  <Link
                    to="/dashboard"
                    search={(prev) => ({ ...prev, userId: user.userId })}
                  >
                    <ListItemIcon>
                      <Avatar
                        alt={`${user.name} avatar`}
                        src={user.avatarUrl}
                      />
                    </ListItemIcon>
                    <ListItemText primary={user.name} secondary={user.email} />
                  </Link>
                </ListItem>
              ))}
              {searchResult.data.length === 0 && (
                <ListItem sx={{ px: "xl" }}>
                  <ListItemText
                    primary={`No users found matching "${debouncedSearchInput.value}"`}
                  />
                </ListItem>
              )}
            </List>
          ) : null}
        </SearchForm>
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "xl" }}>
        <Suspense
          fallback={<CircularProgress size="large" sx={{ margin: "auto" }} />}
        >
          <Outlet />
        </Suspense>
      </Stack>
    </Card>
  );
}

const Stack = styled(StackImpl).attrs({ gap: "l" });
