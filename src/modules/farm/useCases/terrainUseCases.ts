import { UseCase } from "core";
import { convertTimestampToString } from "utils/convertTimestampToString";
import { createTerrain } from "../repos/terrainRepo";

import {
  CreateTerrainResponseType,
  CreateTerrainType,
} from "../schemas/terrainSchemas";

export const createTerrainUc: UseCase<CreateTerrainResponseType> = async (
  terrain: CreateTerrainType,
  userId: string
) => {
  try {
    const newTerrain = convertTimestampToString(
      await createTerrain({ ...terrain, userId })
    );
    return [null, newTerrain];
  } catch (error) {
    return [error, null];
  }
};
