import { createServer } from "./server";
import { env } from "./env";

// The entrypoint for the server.

switch (env.runtime.type) {
  case "lambda":
    module.exports = createServer();
    break;
  case "server":
    const { port } = env.runtime;
    createServer().listen(port, () =>
      console.log(`API available on http://localhost:${port}${env.trpcPath}`),
    );
    break;
}
