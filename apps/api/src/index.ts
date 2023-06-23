import { createServer } from "./server";
import { env } from "./env";

// This is the entrypoint for the server.

switch (env.runtime.type) {
  case "vercel-serverless-function":
    module.exports = createServer();
    break;
  case "long-running-server":
    const { port } = env.runtime;
    createServer().listen(port, () =>
      console.log(`API started on http://localhost:${port}${env.trpcPath}`)
    );
    break;
}
