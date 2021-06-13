import { SwaggerOptions } from "fastify-swagger";

export const swaggerConfig = {
  routePrefix: "/doc",
  swagger: {
    info: {
      title: "Fastify Base",
      description: "testing the fastify swagger api",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
        name: "Authentication",
        description: "Authentication related end-points",
      },
    ],
    // definitions: {
    //   User: {
    //     type: "object",
    //     required: ["id", "email"],
    //     properties: {
    //       id: { type: "string", format: "uuid" },
    //       firstName: { type: "string" },
    //       lastName: { type: "string" },
    //       email: { type: "string", format: "email" },
    //     },
    //   },
    // },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
  uiConfig: {
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
} as SwaggerOptions;
