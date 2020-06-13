const dotenv = require("dotenv");
const fs = require("fs");

// Load env files.
[".env", ".env.local"].forEach((path) => {
  if (fs.existsSync(path)) {
    dotenv.config({ path });
    console.log(`server: loaded env from '${path}'`);
  }
});

const getPort = require("get-port");
const { createApp } = require("./app");

async function main() {
  try {
    const { TAILGUARD_PORT } = process.env;
    const port = await getPort({ port: TAILGUARD_PORT ?? 8080 });

    const app = await createApp();
    app.listen({ port });
    console.log(`server: listening on ${port}...`);
  } catch (error) {
    console.error(error);
  }
}

main();
