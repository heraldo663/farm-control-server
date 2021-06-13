import { Static, Type } from "@sinclair/typebox";

export const SignUp = Type.Object({
  name: Type.Optional(Type.String({ minLength: 2 })),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
});
export type SignUpType = Static<typeof SignUp>;

export const SignUpResponse = Type.Object({
  id: Type.Unknown(),
  name: Type.Optional(Type.String({ minLength: 2 })),
  email: Type.String({ format: "email" }),
  updatedAt: Type.String(),
  createdAt: Type.String(),
});
export type SignUpResponseType = Static<typeof SignUpResponse>;

export const SignIn = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
});

export type SignInType = Static<typeof SignIn>;

export const SignInResponse = Type.Object({
  token: Type.String(),
  ttl: Type.String(),
});

export type SignInResponseType = Static<typeof SignInResponse>;

export const CurrentUserResponse = Type.Object({
  id: Type.String(),
  name: Type.Optional(Type.String({ minLength: 2 })),
  email: Type.String({ format: "email" }),
});
