import { FastifyInstance } from "fastify";
import faker from "faker";

import createApp from "app";

let app: FastifyInstance;

describe("Auth Module", () => {
  beforeAll(async () => {
    app = await createApp();
  });
  afterAll(() => {
    app.close();
  });
  const newUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: "123456",
  };

  it("Should be able to register a new user", async (done) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-up",
      payload: newUser,
    });

    const res = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(res.email).toBe(newUser.email);
    expect(res.name).toBe(newUser.name);
    expect(res.id).toBeDefined();

    done();
  });

  it("Should not be able to register a new user with invalid email", async (done) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-up",
      payload: {
        name: "sample",
        email: "tesrteste1231221231",
        password: "123456",
      },
    });

    expect(response.statusCode).toBe(400);

    done();
  });

  it("Should not be able to register a user who already being registered", async (done) => {
    await app.inject({
      method: "POST",
      url: "/api/v1/sign-up",
      payload: {
        name: "sample",
        email: "test@teste.com",
        password: "123456",
      },
    });
    const response2 = await app.inject({
      method: "POST",
      url: "/api/v1/sign-up",
      payload: {
        name: "sample",
        email: "test@teste.com",
        password: "123456",
      },
    });

    expect(response2.statusCode).toBe(400);

    done();
  });

  it("Should not be able to register with a password shorter then 6 characters ", async (done) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-up",
      payload: {
        name: "sample",
        email: "tesr@teste.com",
        password: "1234",
      },
    });

    expect(response.statusCode).toBe(400);

    done();
  });

  it("Should be able to authenticate a user", async (done) => {
    const user = {
      email: newUser.email,
      password: "123456",
    };
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      payload: user,
    });

    const res = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(res.token).toBeDefined();

    done();
  });

  it("Should be unable to authenticate a user with wrong password", async (done) => {
    const user = {
      email: "tesr@teste.com",
      password: "1234562232",
    };
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      payload: user,
    });

    const res = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(res.message).toBe("Wrong credentials");

    done();
  });

  it("Should not be unable to authenticate a user who is not registered in the system", async (done) => {
    const user = {
      email: "tesr@testeeeeeeeeeeeee.com",
      password: "1234562232",
    };
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      payload: user,
    });

    const res = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(res.message).toBe("Wrong credentials");

    done();
  });

  it("Should be unable to authenticate a user with a invalid email", async (done) => {
    const user = {
      email: "tesr21321",
      password: "1234562232",
    };
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      payload: user,
    });
    expect(response.statusCode).toBe(400);

    done();
  });

  it("Should be able to get the authenticated user", async (done) => {
    const user = {
      email: newUser.email,
      password: "123456",
    };
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      payload: user,
    });

    const res = JSON.parse(response.body);

    const response2 = await app.inject({
      method: "GET",
      url: "/api/v1/current-user",
      headers: {
        Authorization: res.token,
      },
    });

    const res2 = JSON.parse(response2.body);
    expect(response2.statusCode).toBe(200);
    expect(res2.id).toBeDefined();
    expect(res2.email).toBe(user.email);
    expect(res2.password).toBeUndefined();

    done();
  });
});
