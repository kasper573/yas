import "reflect-metadata";
import * as path from "path";
import * as fs from "fs";
import { generate } from "@gqty/cli";
import type { GraphQLSchema } from "graphql/type";

export async function generateClient(schema: GraphQLSchema) {
  const { schemaCode } = await generate(schema);
  return updateFileIfChanged(
    path.resolve(__dirname, "../sdk/client.generated.ts"),
    `/* eslint-disable */\n// @ts-nocheck\n${schemaCode}`
  );
}

async function updateFileIfChanged(file: string, newContent: string) {
  const currentContent = await fs.promises.readFile(file, "utf8");
  if (currentContent === newContent) {
    return false;
  }
  await fs.promises.writeFile(file, newContent);
  return true;
}
