import { AppError } from "core";
import { FastifyReply } from "fastify";

export function useCaseFastifyHandler<T>(
  [err, result]: [AppError | null, unknown | T],
  res: FastifyReply,
  status = 200
): FastifyReply {
  if (err) {
    res.status(err.statusCode);
    return res.send({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  res.status(status);
  return res.send(result);
}
