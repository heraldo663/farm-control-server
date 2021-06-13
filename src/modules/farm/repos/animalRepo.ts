import db from "../../../database";
import { User } from ".prisma/client";

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const newUser = {
    name,
    email,
    password_hash: password,
  };
  const user = await db.user.create({ data: newUser });
  return user;
};

export const findUserByEmail = async (email: string): Promise<User> => {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
};
