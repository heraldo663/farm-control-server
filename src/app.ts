import fastify, { FastifyInstance } from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import swagger from "fastify-swagger";

import { connect } from "providers/events/EventEmittery";
import { swaggerConfig } from "./swagger";
import { initModules } from "core";

import { AuthModule } from "modules/auth/auth";
import { FarmModule } from "modules/farm/farm";
import { NotificationModule } from "modules/notification/notification";

const modules = [AuthModule, NotificationModule, FarmModule];

async function createApp(): Promise<FastifyInstance> {
  const app = fastify({
    logger: process.env.NODE_ENV !== "test",
  });

  if (process.env.NODE_ENV !== "test") {
    app.register(helmet);
    app.register(cors);
    app.register(swagger, swaggerConfig);
  }

  app.get("/", function (request, reply) {
    reply.send({ Status: "online" });
  });

  await connect();
  const v1Prefix = "/api/v1";
  initModules(modules, app, v1Prefix);

  return app;
}

export default createApp;
