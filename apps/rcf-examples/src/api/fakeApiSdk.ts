import { z } from "zod";

export type Range = z.infer<typeof rangeType>;
export const rangeType = z.tuple([z.number(), z.number()]);

export const discountType = z.enum(["5%", "10%", "20%", "50%"]);
export const priceType = rangeType.brand("price");
export const screenSizeType = rangeType.brand("screenSize");

export async function fetchPriceRange(): Promise<Range> {
  await wait(1000);
  return [51, 2606628];
}

export async function fetchScreenSizeRange(): Promise<Range> {
  await wait(1000);
  return [6, 143];
}

export type Manufacturer = z.infer<typeof manufacturerType>;
export type ManufacturerId = z.infer<typeof manufacturerIdType>;

export const manufacturerIdType = z.string().brand("manufacturerId");
export const manufacturerType = z.object({
  id: manufacturerIdType,
  name: z.string(),
});

export async function fetchManufacturers(): Promise<Manufacturer[]> {
  await wait(1000);
  return [
    { id: "1" as ManufacturerId, name: "Apple" },
    { id: "2" as ManufacturerId, name: "Samsung" },
    { id: "3" as ManufacturerId, name: "Huawei" },
  ];
}

export type Resolution = z.infer<typeof resolutionType>;
export type ResolutionId = z.infer<typeof resolutionIdType>;
export const resolutionIdType = z.string().brand("resolutionId");
export const resolutionType = z.object({
  id: resolutionIdType,
  name: z.string(),
});

export async function fetchResolutions(): Promise<Resolution[]> {
  await wait(1000);
  return [
    { id: "1" as ResolutionId, name: "2560x1440" },
    { id: "2" as ResolutionId, name: "1920x1080" },
    { id: "3" as ResolutionId, name: "1280x720" },
  ];
}

export type Filter = z.infer<typeof filterType>;
export const filterType = z.object({
  price: priceType,
  discount: discountType,
  manufacturer: manufacturerIdType.array(),
  resolution: resolutionIdType.array(),
  screenSize: screenSizeType,
});

export type PaginationData = {
  page: number;
  size: number;
};

export type SearchQuery = {
  filter?: Filter;
  pagination: PaginationData;
};

const db: unknown[] = [];

for (let i = 0; i < 1000; i++) {
  db.push(`Entry` + i);
}

export function search(query?: SearchQuery) {
  const results = db;
  return {
    entries: paginate(results, query?.pagination ?? { page: 0, size: 10 }),
    total: results.length,
    metrics: {
      Price: (query?.filter?.manufacturer?.length ?? 0) * 10,
    },
  };
}

export function paginate(
  entries: unknown[],
  { page, size }: PaginationData,
): unknown[] {
  return entries.slice(page * size, (page + 1) * size);
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
