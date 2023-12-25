import { styled } from "@yas/style";
import {
  Avatar,
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryContent,
  ListItemText,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
} from "@yas/ui";
import {
  RocketIcon,
  PersonIcon,
  CardStackIcon,
  BarChartIcon,
} from "@yas/icons";
import { Card } from "./Card";
import { Stats } from "./Stats";
import { Chart } from "./Chart";
import { formatCurrency } from "./currency";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];
const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: 1999 },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: 39 },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: 299 },
  { name: "William Kim", email: "will@email.com", amount: 99 },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: 39 },
];

export default function Dashboard() {
  return (
    <Card sx={{ p: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "#2", px: "#5" }}>
        <OrganizationSelect />
        <Tabs variant="text-highlight" sx={{ flex: 1 }}>
          {mainNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Search />
        <UserMenu />
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "#5" }}>
        <Title>Dashboard</Title>
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Stack direction="row" align="stretch">
          <Stats
            title="Total Revenue"
            amount={formatCurrency(45231.89)}
            description="+20.1% from last month"
            icon={<RocketIcon />}
          />
          <Stats
            title="Subscriptions"
            amount="+2350"
            description="+180.1% from last month"
            icon={<PersonIcon />}
          />
          <Stats
            title="Sales"
            amount="+12,234"
            description="+19% from last month"
            icon={<CardStackIcon />}
          />
          <Stats
            title="Active Now"
            amount="+573"
            description="+201 since last hour"
            icon={<BarChartIcon />}
          />
        </Stack>
        <Stack direction="row" align="stretch">
          <Card sx={{ flex: 3, gap: "#4" }}>
            <div>
              <Text variant="h5">Overview</Text>
              <Text>&nbsp;</Text>
            </div>
            <Chart />
          </Card>
          <Card sx={{ flex: 2, gap: "#4", px: 0 }}>
            <Box sx={{ px: "#5" }}>
              <Text variant="h5">Recent Sales</Text>
              <Text>You made 265 sales this month.</Text>
            </Box>
            <List>
              {sales.map((sale, index) => (
                <ListItem button key={index} sx={{ px: "#5" }}>
                  <ListItemIcon>
                    <Avatar
                      src={`https://picsum.photos/32/32?grayscale&random=${index}`}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sale.name} secondary={sale.email} />
                  <ListItemSecondaryContent>
                    <Text variant="h3">+{formatCurrency(sale.amount)}</Text>
                  </ListItemSecondaryContent>
                </ListItem>
              ))}
            </List>
          </Card>
        </Stack>
      </Stack>
    </Card>
  );
}

const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", sx: { lineHeight: 1 } });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
