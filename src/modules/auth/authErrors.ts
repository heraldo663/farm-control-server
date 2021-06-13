import { AppError } from "core";
import { FastifyReply } from "fastify";

export const unauthenticatedError = (reply: FastifyReply) => {
  const error: AppError = {
    message: "Unauthenticated user",
    statusCode: 401,
  };
  reply.status(error.statusCode);
  return reply.send({
    statusCode: error.statusCode,
    message: error.message,
  });
};

export const unauthorizedError = (reply: FastifyReply) => {
  const error: AppError = {
    message: "Unauthorized user",
    statusCode: 403,
  };
  reply.status(error.statusCode);
  return reply.send({
    statusCode: error.statusCode,
    message: error.message,
  });
};
