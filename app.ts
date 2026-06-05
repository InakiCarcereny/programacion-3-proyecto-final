import { Server } from "./core/server";
import { seed } from "./seed";

async function main(): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    await seed();
  }

  const server = new Server();
  server.listen();
}

main();
