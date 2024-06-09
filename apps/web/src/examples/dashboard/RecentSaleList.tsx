import {
  Avatar,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryContent,
  ListItemText,
  Text,
} from "@yas/ui";
import type { types } from "@yas/trpc-client";
import { formatNumber } from "../shared";

export function RecentSaleList({ data }: { data: types.example.RecentSale[] }) {
  return (
    <List compact>
      {data.map((sale, index) => (
        <ListItem asChild button key={index} sx={{ px: "l" }}>
          <Link
            to="/dashboard"
            search={(prev) => ({ ...prev, userId: sale.userId })}
          >
            <ListItemIcon>
              <Avatar alt={`${sale.name} avatar`} src={sale.avatarUrl} />
            </ListItemIcon>
            <ListItemText primary={sale.name} secondary={sale.email} />
            <ListItemSecondaryContent>
              <Text intent="h3">
                {formatNumber(sale.amount, ["sign", "currency"])}
              </Text>
            </ListItemSecondaryContent>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
