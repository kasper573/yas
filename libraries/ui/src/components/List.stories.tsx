import type { Meta, StoryObj } from "@yas/test/storybook";
import { PersonIcon } from "@yas/icons";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryContent,
} from "./List";

export default {
  component: List,
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

const range = [1, 2, 3];

export const Default: StoryObj<Meta<typeof List>> = {
  args: {
    children: (
      <>
        {range.map((index) => (
          <ListItem key={index}>ListItem</ListItem>
        ))}
      </>
    ),
  },
};

export const Button: StoryObj<Meta<typeof List>> = {
  args: {
    children: (
      <>
        {range.map((index) => (
          <ListItem button key={index}>
            ListItem
          </ListItem>
        ))}
      </>
    ),
  },
};

export const Icon: StoryObj<Meta<typeof List>> = {
  args: {
    children: (
      <>
        {range.map((index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            ListItem
          </ListItem>
        ))}
      </>
    ),
  },
};

export const Text: StoryObj<Meta<typeof List>> = {
  args: {
    children: (
      <>
        {range.map((index) => (
          <ListItem key={index}>
            <ListItemText primary="Primary" secondary="Secondary" />
          </ListItem>
        ))}
      </>
    ),
  },
};

export const SecondaryContent: StoryObj<Meta<typeof List>> = {
  args: {
    children: (
      <>
        {range.map((index) => (
          <ListItem key={index}>
            ListItem
            <ListItemSecondaryContent>
              Secondary Content
            </ListItemSecondaryContent>
          </ListItem>
        ))}
      </>
    ),
  },
};

export const Everything: StoryObj<Meta<typeof List>> = {
  args: {
    children: (
      <>
        {range.map((index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Primary" secondary="Secondary" />
            <ListItemSecondaryContent>
              Secondary Content
            </ListItemSecondaryContent>
          </ListItem>
        ))}
      </>
    ),
  },
};
