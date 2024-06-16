import { createServer } from "./definition/server";
import { env } from "./env";

switch (env.runtime.type) {
  case "lambda":
    console.log("Exporting lambda handler");
    module.exports = createServer();
    break;
  case "server":
    const { port } = env.runtime;
    createServer().listen(port, () =>
      console.log(`API available on http://localhost:${port}${env.trpcPath}`),
    );
    break;
}
