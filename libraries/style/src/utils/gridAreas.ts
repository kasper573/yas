import { style } from "@vanilla-extract/css";

/**
 * Helps to define grid areas in a type-safe way.
 */
export class GridAreas<const AreaName extends string> {
  /**
   * Produces a grid template string based on the given groups.
   * Ensures that all areas are included in the template.
   */
  template(
    groups: AreaName[][] = this.areas.map((areaName) => [areaName]),
  ): string {
    return `"${groups.map((g) => g.join(" ")).join('"\n"')}"`;
  }

  /**
   * Produces a record of class names for each area in the grid to assign to elements.
   * Their styles will assign the `gridArea` property.
   */
  createClassNames(): GridAreaClassNames<AreaName> {
    return Object.fromEntries(
      this.areas.map((gridArea) => [gridArea, fastStyle({ gridArea })]),
    ) as GridAreaClassNames<AreaName>;
  }

  /**
   * The area names that was used to create the grid.
   * Useful if you want to manually create the styles and assign the `gridArea` property yourself.
   */
  readonly areaNames: GridAreaNames<AreaName>;

  constructor(private areas: AreaName[]) {
    this.areaNames = Object.fromEntries(
      areas.map((areaName) => [areaName, areaName]),
    ) as GridAreaNames<AreaName>;
  }
}

type GridAreaClassNames<AreaName extends string> = {
  [N in AreaName]: string;
};

type GridAreaNames<AreaName extends string> = {
  [N in AreaName]: N;
};

// Typescript performance trace shows that using the style function inside the GridAreas class
// for some reason causes a fairly significant bottleneck in the type checker.
// If we loosen its type definition it becomes much faster to type check,
// at the cost of losing some type safety. It's an all right trade-off here.-
const fastStyle: (props: Record<string, unknown>) => string = style;
