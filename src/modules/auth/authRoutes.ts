import { FastifyPluginCallback } from "fastify";
import { useCaseFastifyHandler } from "utils/useCaseFastifyHandler";

import {
  SignUpType,
  SignUp,
  SignUpResponse,
  SignUpResponseType,
  SignIn,
  SignInType,
  SignInResponseType,
  SignInResponse,
  CurrentUserResponse,
} from "./authSchemas";

import { signIn, signUp } from "./authUseCases";

export const authRoutes: FastifyPluginCallback = (app, _, done): void => {
  app.route<{ Body: SignUpType; Response: SignUpResponseType }>({
    method: "POST",
    url: "/sign-up",
    schema: {
      tags: ["Authentication"],
      body: SignUp,
      response: {
        201: SignUpResponse,
      },
    },
    handler: async (req, res) => {
      const { body: user } = req;
      return useCaseFastifyHandler(await signUp(user), res, 201);
    },
  });

  app.post<{ Body: SignInType; Response: SignInResponseType }>(
    "/sign-in",
    {
      schema: {
        tags: ["Authentication"],
        body: SignIn,
        response: {
          200: SignInResponse,
        },
      },
    },
    async (req, res) => {
      const { body: user } = req;

      return useCaseFastifyHandler(await signIn(user), res);
    }
  );

  app.route({
    method: "GET",
    url: "/current-user",
    schema: {
      tags: ["Authentication"],
      response: {
        201: CurrentUserResponse,
      },
    },
    preValidation: [app.authenticate],
    handler: async (req, res) => {
      return res.send(req.user);
    },
  });

  done();
};
