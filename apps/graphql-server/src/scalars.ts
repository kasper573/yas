import type { GraphQLSchema } from "graphql";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql";

// Temporary solution until grats has a better way define custom scalars.
// See https://github.com/captbaritone/grats/issues/66
export function addScalarsToSchema(schema: GraphQLSchema) {
  for (const [typeName, addScalarToSchema] of Object.entries(
    scalarTypeAdders,
  )) {
    const scalar = schema.getType(typeName);
    if (!(scalar instanceof GraphQLScalarType)) {
      throw new Error(`Expected "${typeName}" to be a scalar type`);
    }
    addScalarToSchema(scalar);
  }
}

const scalarTypeAdders: Record<
  keyof Scalars,
  (scalar: GraphQLScalarType) => void
> = {
  GqlDate,
};

// Keys must match a gqlScalar name in grats.
export interface Scalars {
  GqlDate: Date;
}

/**
 * A date and time. Serialized as a Unix timestamp.
 *
 * @gqlScalar GqlDate
 * @specifiedBy https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-objects
 */
export type GqlDate = Date;

function GqlDate(dateType: GraphQLScalarType) {
  dateType.serialize = (value) => {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  };
  dateType.parseValue = (value) => {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  };
  dateType.parseLiteral = (ast) => {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  };
}
