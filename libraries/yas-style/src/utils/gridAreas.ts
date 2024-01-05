import { style } from "@vanilla-extract/css";

/**
 * Helps to define grid areas in a type-safe way.
 */
export function createGrid<AreaName extends string>(
  ...areas: AreaName[]
): GridAreas<AreaName> {
  const classNames = Object.fromEntries(
    areas.map((gridArea) => [gridArea, style({ gridArea })]),
  ) as GridAreas<AreaName>["classNames"];

  return {
    template: (groups = areas.map((areaName) => [areaName])) =>
      `"${groups.map((g) => g.join(" ")).join('"\n"')}"`,
    classNames,
  };
}

export interface GridAreas<AreaName extends string> {
  /**
   * Produces a grid template string based on the given groups.
   * Ensures that all areas are included in the template.
   */
  template(groups?: AreaName[][]): string;
  /**
   * The class names to assign to each element that should be part of the grid.
   * Its style will assign the `gridArea` property.
   */
  classNames: { [N in AreaName]: string };
}
