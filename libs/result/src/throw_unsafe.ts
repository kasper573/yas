/**
 * Escape hatch for throwing errors without getting linting errors.
 * Completely bypasses the linting rules, so use with extreme caution.
 */
export function throw_unsafe_onlyUseThisFor3rdPartyIntegrations(
  throwable: unknown,
) {
  throw throwable;
}
