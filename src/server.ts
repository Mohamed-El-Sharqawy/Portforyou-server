import Database from "./config/database";
import logger from "./lib/utils/logger";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './schema';
import { DEFAULT_PORT } from "./lib/constants";

export async function startServer() {
  const db = Database.getInstance();
  await db.connect();
  logger.info('Database connected successfully');

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ 
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true
    }),
    express.json(),
    // @ts-ignore
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: DEFAULT_PORT }, resolve));
  logger.info(`Server ready at http://localhost:${DEFAULT_PORT}/graphql`);

  return httpServer;
}
