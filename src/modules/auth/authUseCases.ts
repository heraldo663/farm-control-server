import { UseCase } from "core";
import { USER_CREATED } from "modules/shared/eventConstants";
import { compare, hash } from "providers/bcrypt";
import { emit } from "providers/events/EventEmittery";
import { encode } from "providers/jwt";
import authConfig from "./authConfig";
import { createUser, findUserByEmail } from "./authRepo";
import {
  SignInResponseType,
  SignInType,
  SignUpResponseType,
  SignUpType,
} from "./authSchemas";

export const signIn: UseCase<SignInResponseType> = async (
  credentials: SignInType
) => {
  const savedUser = await findUserByEmail(credentials.email);

  if (!savedUser) {
    return [
      {
        statusCode: 400,
        message: "Wrong credentials",
      },
      null,
    ];
  }

  if (!(await compare(credentials.password, savedUser.password_hash))) {
    return [
      {
        statusCode: 400,
        message: "Wrong credentials",
      },
      null,
    ];
  }

  const token = encode(
    authConfig.ttl,
    authConfig.secret,
    savedUser.email,
    savedUser.id,
    savedUser.name
  );

  return [
    null,
    {
      token: `Bearer ${token}`,
      ttl: authConfig.ttl,
    },
  ];
};

export const signUp: UseCase<SignUpResponseType> = async (
  userData: SignUpType
) => {
  if (await findUserByEmail(userData.email)) {
    return [
      {
        statusCode: 400,
        message: "User email already registered",
      },
      null,
    ];
  }

  const savedUser = await createUser(
    userData.name,
    userData.email,
    await hash(userData.password)
  );

  emit(USER_CREATED, savedUser);

  return [
    null,
    {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt.toString(),
      updatedAt: savedUser.updatedAt.toString(),
    },
  ];
};
