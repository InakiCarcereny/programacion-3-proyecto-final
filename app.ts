import { Server } from './core/server';
import { seed } from './lib/db/seed';
import sequelize from './lib/db/db.config';
import './models';
import { initDatabaseTriggers } from './models';

async function main(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  await initDatabaseTriggers();

  if (process.env.NODE_ENV === 'development') {
    await seed();
  }

  const server = new Server();
  server.listen();
}

main();
