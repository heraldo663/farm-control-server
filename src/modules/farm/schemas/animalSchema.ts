import { Static, Type } from "@sinclair/typebox";

// Create

export const CreateAnimal = Type.Object({
  name: Type.Optional(Type.String({ minLength: 2 })),
  code: Type.String(),
  terrainId: Type.String(),
  age: Type.Optional(Type.String()),
  race: Type.Optional(Type.String()),
  weight_value: Type.Optional(Type.Number()),
  weight_unit: Type.Optional(Type.String()),
});
export type CreateAnimalType = Static<typeof CreateAnimal>;

export const CreateAnimalResponse = Type.Object({
  id: Type.Unknown(),
  name: Type.Optional(Type.String({ minLength: 2 })),
  code: Type.String(),
  terrainId: Type.String(),
  age: Type.Optional(Type.String()),
  race: Type.Optional(Type.String()),
  weight_value: Type.Optional(Type.Number()),
  weight_unit: Type.Optional(Type.String()),
  updatedAt: Type.String(),
  createdAt: Type.String(),
});
export type CreateAnimalResponseType = Static<typeof CreateAnimalResponse>;

// Update

export const UpdateAnimal = Type.Object({
  name: Type.Optional(Type.String({ minLength: 2 })),
  code: Type.Optional(Type.String()),
  terrainId: Type.Optional(Type.String()),
  age: Type.Optional(Type.String()),
  race: Type.Optional(Type.String()),
  weight_value: Type.Optional(Type.Number()),
  weight_unit: Type.Optional(Type.String()),
});
export type UpdateAnimalType = Static<typeof UpdateAnimal>;

export const UpdateAnimalResponse = Type.Object({
  id: Type.Unknown(),
  name: Type.Optional(Type.String({ minLength: 2 })),
  code: Type.String(),
  terrainId: Type.String(),
  age: Type.Optional(Type.String()),
  race: Type.Optional(Type.String()),
  weight_value: Type.Optional(Type.Number()),
  weight_unit: Type.Optional(Type.String()),
  updatedAt: Type.String(),
  createdAt: Type.String(),
});
export type UpdateAnimalResponseType = Static<typeof UpdateAnimalResponse>;
