import { style } from "@vanilla-extract/css";

/**
 * Helps to define grid areas in a type-safe way.
 */
export function createGrid<AreaName extends string>(
  ...areaNames: AreaName[]
): GridAreas<AreaName> {
  const styles = Object.fromEntries(
    areaNames.map((areaName) => [
      areaName,
      style({ gridArea: areaName, boxSizing: "border-box" }),
    ]),
  ) as GridAreas<AreaName>["styles"];

  return {
    template: (groups = areaNames.map((areaName) => [areaName])) =>
      `"${groups.map((g) => g.join(" ")).join('"\n"')}"`,
    styles,
  };
}

export interface GridAreas<AreaName extends string> {
  template(groups?: AreaName[][]): string;
  styles: { [N in AreaName]: string };
}
