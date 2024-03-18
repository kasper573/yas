import type { Meta, StoryObj } from "@yas/storybook";
import { useState } from "react";
import { Pagination } from "./Pagination";

export default {
  component: Pagination,
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
