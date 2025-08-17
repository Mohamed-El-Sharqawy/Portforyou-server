import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import Database from '../src/config/database';
import { typeDefs, resolvers } from '../src/schema';

interface MyContext {
  token?: string;
  req: express.Request;
}

let cachedApp: express.Express | null = null;
let started = false;

async function getApp(): Promise<express.Express> {
  if (cachedApp && started) return cachedApp;

  // Ensure DB is connected once per cold start
  const db = Database.getInstance();
  await db.connect();

  const app = express();

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'https://portforyou-beta.vercel.app',
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = (req.headers.authorization as string) || '';
        return { token, req };
      },
    })
  );

  cachedApp = app;
  started = true;
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await getApp();
  return (app as any)(req, res);
}
