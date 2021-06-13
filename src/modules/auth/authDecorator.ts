import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { decode } from "providers/jwt";
import authConfig from "./authConfig";
import { unauthenticatedError } from "./authErrors";

export const authDecorator = (app: FastifyInstance): void => {
  app.decorateRequest("user", null);

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        if (request.headers.authorization) {
          const token = request.headers.authorization.split(" ")[1];
          const user = await decode(token, authConfig.secret);
          if (user) {
            request.user = user;
            return;
          }
        }
        unauthenticatedError(reply);
      } catch (err) {
        console.log(err);
        unauthenticatedError(reply);
      }
    }
  );
};
