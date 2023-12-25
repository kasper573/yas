import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryContent,
  ListItemText,
  Text,
} from "@yas/ui";
import { formatCurrency } from "./shared";

export function SalesList() {
  return (
    <List>
      {sales.map((sale, index) => (
        <ListItem button key={index} sx={{ px: "#5" }}>
          <ListItemIcon>
            <Avatar
              alt={`${sale.name} avatar`}
              src={`https://picsum.photos/40/40?grayscale&random=${index}`}
            />
          </ListItemIcon>
          <ListItemText primary={sale.name} secondary={sale.email} />
          <ListItemSecondaryContent>
            <Text variant="h3">+{formatCurrency(sale.amount)}</Text>
          </ListItemSecondaryContent>
        </ListItem>
      ))}
    </List>
  );
}

const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: 1999 },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: 39 },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: 299 },
  { name: "William Kim", email: "will@email.com", amount: 99 },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: 39 },
];
