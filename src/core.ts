import { FastifyPluginCallback, FastifyInstance } from "fastify";
import { subscribe } from "providers/events/EventEmittery";
import { Subscribe } from "providers/events/events";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req, res) => Promise<void>;
  }

  interface FastifyRequest {
    user: { id: string; email: string };
  }
}

export type AppError = null | {
  statusCode: number;
  error?: string;
  message: string;
};

export type UseCase<T> = (
  ...args: unknown[]
) => Promise<[AppError, null | T]> | [AppError, null | T];

export type Module = {
  apiRoutes?: FastifyPluginCallback;
  decorators?: (app: FastifyInstance) => void;
  Listener?: (subscribe: Subscribe) => void;
  boot?: () => void;
};

export type Model = {
  id: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export function initModules(
  modules: Module[],
  fastifyApp: FastifyInstance,
  apiPrefix: string
): void {
  modules.forEach((module) => {
    if (module.boot) module.boot();
  });
  modules.forEach((module) => {
    if (module.Listener) module.Listener(subscribe);
  });
  modules.forEach((module) => {
    if (module.apiRoutes)
      fastifyApp.register(module.apiRoutes, { prefix: apiPrefix });
  });
  modules.forEach((module) => {
    if (module.decorators) module.decorators(fastifyApp);
  });
}
