import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import HttpHeadersPlugin from "apollo-server-plugin-http-headers";
import { MicroRequest } from "apollo-server-micro/dist/types";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { customAuthChecker } from "../../server/utils/auth";
import { resolvers } from "../../server/resolvers";

class App {
  public server: ApolloServer;

  constructor() {
    this.connectToDatabase();
  }

  async connectToDatabase() {
    console.log("Trying to connect...")
    try {
      await mongoose.connect(process.env.DATABASE_URL ?? "");
      console.log("Connected to database");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  }

  async generateSchema() {
    const schema = await buildSchema({
      resolvers,
      authChecker: customAuthChecker,
    });
    return schema;
  }

  async createServer() {
    const schema = await this.generateSchema();
    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground,
        HttpHeadersPlugin,
      ],
      context: async ({ req, res }) => {
        const accessTokenCookie = req.headers.cookie
          ?.split("; ")
          .find((cookie: string) => cookie.startsWith("accessToken="));
        const token = accessTokenCookie?.split("=")[1];
        const secretKey = process.env.PRIVATE_KEY || "";
        let user = null;
        try {
          const decodedToken = jwt.verify(token, secretKey);
          user = decodedToken;
        } catch (error) { }
        return user
          ? { user, setCookies: new Array() }
          : { req, res, setCookies: new Array() };
      },
    });

    return server;
  }

  async connectServer() {
    this.server = await this.createServer();
    await this.server.start();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
const app = new App();
const connection = await app.connectServer();
const server = app.server;

export default async function handler(req: MicroRequest, res: any) {
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
