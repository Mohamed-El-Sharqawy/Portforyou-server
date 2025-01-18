import Database from "./config/database";
import logger from "./lib/utils/logger";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schema";
import { DEFAULT_PORT } from "./lib/constants";

export async function startServer() {
  const db = Database.getInstance();
  await db.connect();
  logger.info('Database connected successfully');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: DEFAULT_PORT },
  });

  logger.info(`Server ready at ${url}`);
}
