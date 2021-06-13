import { FastifyInstance } from "fastify";
import { useCaseFastifyHandler } from "utils/useCaseFastifyHandler";
import {
  CreateTerrain,
  CreateTerrainResponse,
  CreateTerrainResponseType,
  CreateTerrainType,
} from "../schemas/terrainSchemas";
import { createTerrainUc } from "../useCases/terrainUseCases";

export const terrainRoutes = (app: FastifyInstance): void => {
  app.route<{ Body: CreateTerrainType; Response: CreateTerrainResponseType }>({
    method: "POST",
    url: "/farm/terrain",
    schema: {
      tags: ["farm"],
      body: CreateTerrain,
      response: {
        201: CreateTerrainResponse,
      },
    },
    preValidation: [app.authenticate],
    handler: async (req, res) => {
      const {
        body: terrain,
        user: { id },
      } = req;

      return useCaseFastifyHandler(
        await createTerrainUc(terrain, id),
        res,
        201
      );
    },
  });
};
