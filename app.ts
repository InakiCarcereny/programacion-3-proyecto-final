import { Server } from "./core/server";
import { seed } from "./seed";
import sequelize from "./db.config";
import "./models";

async function main(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  if (process.env.NODE_ENV === "development") {
    await seed();
  }

  const server = new Server();
  server.listen();
}

main();
