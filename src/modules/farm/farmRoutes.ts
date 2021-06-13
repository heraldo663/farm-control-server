import { FastifyPluginCallback } from "fastify";
import { terrainRoutes } from "./api/terrainRoutes";

export const farmRoutes: FastifyPluginCallback = (app, _, done): void => {
  terrainRoutes(app);
  done();
};
