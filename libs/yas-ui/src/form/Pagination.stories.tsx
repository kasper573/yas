import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

export default {
  title: "form/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export const Default: StoryObj<typeof Pagination> = {
  args: {
    totalPages: 10,
  },
  render(props) {
    const [page, setPage] = useState<number>(1);
    return <Pagination {...props} currentPage={page} onChange={setPage} />;
  },
};
