import type { Result } from "neverthrow";

/**
 * Escape hatch for throwing errors without getting linting errors.
 * Completely bypasses the linting rules, so use with extreme caution.
 *
 * This is different from Result._unsafeUnwrap in that we throw
 * an arbitrary value, compared to neverthrow which uses an internal error structure.
 * This is sometimes necessary for some 3rd party integrations that require i.e. Error objects.
 */
export function unwrapUnsafe_useWithCaution<T, E>(result: Result<T, E>): T {
  if (result.isErr()) {
    throw result.error;
  }
  return result.value;
}
