import type { ComponentProps } from "react";
import { range } from "@yas/fn";
import { useMemo } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@yas/icons";
import { styled } from "@yas/style";
import { Stack } from "../layout/Stack";
import { IconButton } from "../atoms/IconButton";
import { Text } from "../atoms/Text";
import { Void } from "../layout/Void";

export interface PaginationProps
  extends Omit<ComponentProps<typeof Stack>, "children" | "onChange"> {
  totalPages: number;
  currentPage: number;
  onChange: (newPage: number) => void;
  visibleRange?: number;
}

export function Pagination({
  totalPages,
  currentPage,
  visibleRange = 5,
  onChange,
  ...rest
}: PaginationProps) {
  const options = useMemo(
    () =>
      range(
        ...clampSpan(
          currentPage - visibleRange,
          currentPage + visibleRange,
          1,
          totalPages || 1,
        ),
      ),
    [totalPages, visibleRange, currentPage],
  );
  return (
    <Stack direction="row" align="center" gap="1" {...rest}>
      <PageButton
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </PageButton>

      {options[0] > 1 && (
        <>
          <PageButton onClick={() => onChange(1)}>
            <Void axis="both">
              <Text variant="caption">1</Text>
            </Void>
          </PageButton>
          <Separator />
        </>
      )}

      <PageButtons
        pages={options}
        currentPage={currentPage}
        onChange={onChange}
      />

      {options[options.length - 1] < totalPages && (
        <>
          <Separator />
          <PageButton onClick={() => onChange(totalPages)}>
            <Void axis="both">
              <Text variant="caption">{totalPages}</Text>
            </Void>
          </PageButton>
        </>
      )}

      <PageButton
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon />
      </PageButton>
    </Stack>
  );
}

interface PageButtonsProps {
  pages: number[];
  currentPage: number;
  onChange: (newPage: number) => void;
}

function PageButtons({ pages, currentPage, onChange }: PageButtonsProps) {
  return (
    <>
      {pages.map((page) => (
        <PageButton
          key={page}
          color="primary"
          onClick={() => onChange(page)}
          disabled={page === currentPage}
        >
          <Void axis="both">
            <Text variant="caption">{page}</Text>
          </Void>
        </PageButton>
      ))}
    </>
  );
}

const PageButton = styled(IconButton).attrs({ size: "small", variant: "text" });
const Separator = styled(Text).attrs({ children: "..." });

function clampSpan(from: number, to: number, min: number, max: number) {
  if (from < min) {
    to += min - from;
    from = min;
  }
  if (to > max) {
    from -= to - max;
    to = max;
  }
  return [from, to] as const;
}
