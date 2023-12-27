import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryContent,
  ListItemText,
  Text,
} from "@yas/ui";
import { format } from "./shared";

export function RecentSaleList({ data }: { data: RecentSale[] }) {
  return (
    <List>
      {data.map((sale, index) => (
        <ListItem button key={index} sx={{ px: "#5" }}>
          <ListItemIcon>
            <Avatar alt={`${sale.name} avatar`} src={sale.avatarUrl} />
          </ListItemIcon>
          <ListItemText primary={sale.name} secondary={sale.email} />
          <ListItemSecondaryContent>
            <Text variant="h3">
              {format(sale.amount, ["sign", "currency"])}
            </Text>
          </ListItemSecondaryContent>
        </ListItem>
      ))}
    </List>
  );
}

type RecentSale = {
  name: string;
  email: string;
  amount: number;
  avatarUrl: string;
};
