import { Static, Type } from "@sinclair/typebox";

// Create

export const CreateTerrain = Type.Object({
  name: Type.String({ minLength: 2 }),
  type: Type.String(),
  longitude: Type.Optional(Type.Number()),
  latitude: Type.Optional(Type.Number()),
});
export type CreateTerrainType = Static<typeof CreateTerrain>;

export const CreateTerrainResponse = Type.Object({
  id: Type.Unknown(),
  name: Type.String({ minLength: 2 }),
  type: Type.String(),
  longitude: Type.Union([Type.Number(), Type.Null()]),
  latitude: Type.Union([Type.Number(), Type.Null()]),
  updatedAt: Type.String(),
  createdAt: Type.String(),
});
export type CreateTerrainResponseType = Static<typeof CreateTerrainResponse>;

// Update

export const UpdateTerrain = Type.Object({
  name: Type.Optional(Type.String({ minLength: 2 })),
  type: Type.Optional(Type.String()),
  longitude: Type.Optional(Type.Number()),
  latitude: Type.Optional(Type.Number()),
});
export type UpdateTerrainType = Static<typeof UpdateTerrain>;

export const UpdateTerrainResponse = Type.Object({
  id: Type.Unknown(),
  name: Type.Optional(Type.String({ minLength: 2 })),
  type: Type.Optional(Type.String()),
  longitude: Type.Optional(Type.Number()),
  latitude: Type.Optional(Type.Number()),
  updatedAt: Type.String(),
  createdAt: Type.String(),
});
export type UpdateTerrainResponseType = Static<typeof UpdateTerrainResponse>;
