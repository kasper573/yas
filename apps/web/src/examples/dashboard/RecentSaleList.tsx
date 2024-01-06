import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryContent,
  ListItemText,
  Text,
} from "@yas/ui";
import type { types } from "@yas/api-client";
import { NavLink } from "../../components/NavLink";
import { format } from "./shared";

export function RecentSaleList({ data }: { data: types.example.RecentSale[] }) {
  return (
    <List compact>
      {data.map((sale, index) => (
        <ListItem asChild button key={index} sx={{ px: "#5" }}>
          <NavLink to={`/dashboard?user=${sale.userId}`}>
            <ListItemIcon>
              <Avatar alt={`${sale.name} avatar`} src={sale.avatarUrl} />
            </ListItemIcon>
            <ListItemText primary={sale.name} secondary={sale.email} />
            <ListItemSecondaryContent>
              <Text variant="h3">
                {format(sale.amount, ["sign", "currency"])}
              </Text>
            </ListItemSecondaryContent>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
}
