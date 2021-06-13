import { Module } from "core";
import { authDecorator } from "./authDecorator";
import { authRoutes } from "./authRoutes";

export const AuthModule: Module = {
  apiRoutes: authRoutes,
  decorators: authDecorator,
};
