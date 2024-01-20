import { styled } from "@yas/style";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack as StackImpl,
  TabItem,
  Tabs,
} from "@yas/ui";
import { useState } from "react";
import { api, enabledWhenDefined } from "@yas/api-client";
import { Outlet } from "@yas/router";
import { useDebounce } from "@yas/hooks";
import { NavLink } from "../../components/NavLink";
import { Card } from "./shared";
import { SearchForm } from "./SearchForm";

const mainNav = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/customers", label: "Customers" },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/settings", label: "Settings" },
] as const;

export default function Layout() {
  const [searchInput, setSearchInput] = useState<string | undefined>();
  const debouncedSearchInput = useDebounce(searchInput, 333);

  const searchResult = api.example.users.list.useQuery(
    ...enabledWhenDefined(debouncedSearchInput.value),
  );

  const isSearching =
    searchInput !== undefined &&
    (debouncedSearchInput.isDebouncing || searchResult.isFetching);

  return (
    <Card sx={{ p: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "#3", px: "#5" }}>
        <Tabs variant="text-highlight" sx={{ flex: 1 }}>
          {mainNav.map(({ to, label }, index) => (
            <TabItem asChild key={index}>
              <NavLink to={to}>{label}</NavLink>
            </TabItem>
          ))}
        </Tabs>
        <SearchForm
          value={searchInput}
          onChange={setSearchInput}
          isLoading={isSearching}
        >
          {searchResult.data ? (
            <List sx={{ minWidth: 200 }}>
              {searchResult.data.map((user, index) => (
                <ListItem asChild button key={index} sx={{ px: "#5" }}>
                  <NavLink
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
                  </NavLink>
                </ListItem>
              ))}
              {searchResult.data.length === 0 && (
                <ListItem sx={{ px: "#5" }}>
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
      <Stack sx={{ flex: 1, p: "#5" }}>
        <Outlet />
      </Stack>
    </Card>
  );
}

const Stack = styled(StackImpl).attrs({ gap: "#4" });
