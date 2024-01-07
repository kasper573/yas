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
import { Suspense, useState } from "react";
import { api, enabledWhenDefined, type types } from "@yas/api-client";
import type { RouteComponentProps } from "@yas/router";
import { NavLink } from "../../components/NavLink";
import { Card } from "./shared";
import { Title } from "./Title";
import { DashboardContent, DashboardSkeleton } from "./DashboardContent";
import { SearchForm } from "./SearchForm";
import { useDebounce } from "./useDebounce";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard({
  search: { date = new Date(), userId },
  setSearch,
}: RouteComponentProps<{ date?: Date; userId: types.example.UserId }>) {
  const setDate = (date?: Date) => setSearch({ date }, { replace: true });
  const setUserId = (userId?: types.example.UserId) => setSearch({ userId });

  const clearSelectedUser = () => setUserId(undefined);
  const [searchInput, setSearchInput] = useState<string | undefined>();
  const debouncedSearchInput = useDebounce(searchInput, 333);

  const selectedUser = api.example.users.get.useQuery(
    ...enabledWhenDefined(userId),
  );

  const searchResult = api.example.users.list.useQuery(
    ...enabledWhenDefined(debouncedSearchInput.value),
  );

  const isSearching =
    searchInput !== undefined &&
    (debouncedSearchInput.isDebouncing || searchResult.isFetching);

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
        <UserMenu />
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "#5" }}>
        <Stack direction="row" justify="spaceBetween">
          <Title
            showClearButton={!!selectedUser.data}
            onClear={clearSelectedUser}
          >
            Dashboard
            {selectedUser.data ? ` for ${selectedUser.data.name}` : undefined}
          </Title>
          <DatePicker value={date} onChange={setDate} />
        </Stack>
        {selectedUser.error ? (
          <Text>Could not find user by id {userId}</Text>
        ) : (
          <>
            <Tabs variant="contained" sx={{ flex: 1 }}>
              {secondaryNav.map((label, index) => (
                <TabItem asChild key={index} active={index === 0}>
                  <Link>{label}</Link>
                </TabItem>
              ))}
            </Tabs>
            <Suspense fallback={<DashboardSkeleton />}>
              <DashboardContent filter={{ date, userId }} />
            </Suspense>
          </>
        )}
      </Stack>
    </Card>
  );
}

const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
