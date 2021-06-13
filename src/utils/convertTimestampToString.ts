import { Model } from "core";

export function convertTimestampToString(model: Model): any {
  return {
    ...model,
    createdAt: model.createdAt.toISOString(),
    updatedAt: model.updatedAt.toISOString(),
  };
}
