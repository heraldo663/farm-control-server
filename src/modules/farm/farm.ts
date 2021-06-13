import { Module } from "core";
import { farmRoutes } from "./farmRoutes";

export const FarmModule: Module = {
  apiRoutes: farmRoutes,
};
