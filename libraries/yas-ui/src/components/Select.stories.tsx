import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDownIcon, ChevronUpIcon } from "@yas/icons";
import {
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectScrollUpButton,
  SelectViewport,
  SelectGroup,
  SelectLabel,
  SelectScrollDownButton,
  SelectDivider,
  SelectValue,
  SelectTriggerIcon,
} from "./Select";
import { SelectItem, SelectRoot } from "./Select";

export default {
  component: SelectShowcase,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectShowcase>;

export const Default: StoryObj<typeof SelectShowcase> = {};

function SelectShowcase() {
  return (
    <SelectRoot>
      <SelectTrigger aria-label="Food">
        <SelectValue placeholder="Select a fruit..." />
        <SelectTriggerIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>

            <SelectDivider />

            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectGroup>

            <SelectDivider />

            <SelectGroup>
              <SelectLabel>Meat</SelectLabel>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </SelectGroup>
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
}
