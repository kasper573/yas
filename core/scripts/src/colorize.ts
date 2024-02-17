import uniqueColor from "uniqolor";
import chalk from "chalk";

export function colorize(str: string) {
  return chalk.hex(uniqueColor(str).color)(str);
}
