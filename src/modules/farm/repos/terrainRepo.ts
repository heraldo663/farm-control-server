import db from "../../../database";
import { Terrain } from ".prisma/client";

export type CreateTerrain = {
  name: string;
  type: string;
  userId: string;
  latitude?: number;
  longitude?: number;
};

export const createTerrain = async ({
  name,
  type,
  userId,
  latitude,
  longitude,
}: CreateTerrain): Promise<Terrain> => {
  const newTerrain = {
    name,
    type,
    latitude,
    longitude,
    userId,
  };
  const terrain = await db.terrain.create({ data: newTerrain });
  return terrain;
};
