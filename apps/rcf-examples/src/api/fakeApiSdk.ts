import { z } from "zod";

export type Manufacturer = z.infer<typeof manufacturerType>;

export const priceReductionType = z.enum(["5%", "10%", "20%", "50%"]);

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

export type Resolution = {
  id: string;
  name: string;
};

async function fetchResolutions(): Promise<Resolution[]> {
  return [
    { id: "1", name: "2560x1440" },
    { id: "2", name: "1920x1080" },
  ];
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
