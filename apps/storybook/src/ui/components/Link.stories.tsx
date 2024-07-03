import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "@yas/ui";
import { Button } from "@yas/ui";

export default {
  component: Link,
} satisfies Meta;

export const Default: StoryObj<Meta<typeof Link>> = {
  args: {
    children: "I am a regular hyperlink",
    href: "http://www.google.com",
  },
};

export const ButtonAsLink: StoryObj<Meta<typeof Link>> = {
  render(props) {
    return (
      <Button intent="text" asChild>
        <Link {...props} />
      </Button>
    );
  },
  args: {
    children: "I am a text button as a link",
    href: "http://www.google.com",
  },
};
