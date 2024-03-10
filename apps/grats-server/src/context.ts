export type Context = ReturnType<typeof createContext>;

export function createContext(request: Request) {
  const headers = parseRequestHeaders(request);
  return {
    clientId: headers["client-id"],
  };
}

export interface GratsServerHeaders {
  "client-id": string;
}

function parseRequestHeaders(request: Request) {
  return Object.fromEntries(
    request.headers.entries(),
  ) as unknown as GratsServerHeaders;
}
