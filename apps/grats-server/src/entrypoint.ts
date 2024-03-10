import { createServer } from "./server";
import { env } from "./env";

switch (env.runtime.type) {
  case "lambda":
    module.exports = createServer(env.graphqlEndpoint);
    break;
  case "server":
    const { port } = env.runtime;
    createServer(env.graphqlEndpoint).listen(port, () =>
      console.log(
        `API available on http://localhost:${port}${env.graphqlEndpoint}`,
      ),
    );
    break;
}
