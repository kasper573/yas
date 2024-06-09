import type { Meta, StoryObj } from "@yas/test/storybook";
import { Link } from "./Link";
import { Button } from "./Button";

export default {
  component: Link,
  tags: ["autodocs"],
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
