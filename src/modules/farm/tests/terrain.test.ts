import faker from "faker";

import createApp from "app";

let app, user, token: string;

describe("Farm Module -> Terrain routes", () => {
  beforeAll(async (done) => {
    app = await createApp();
    user = {
      email: "teste@teste.com",
      password: "123456",
      name: "teste",
    };
    await app.inject({
      method: "POST",
      url: "/api/v1/sign-up",
      payload: user,
    });
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      payload: user,
    });
    const res = JSON.parse(response.body);
    token = res.token;
    done();
  });
  afterAll(() => {
    app.close();
  });
  const newTerrain = {
    name: faker.name.findName(),
    type: "chácara",
    longitude: parseFloat(faker.address.longitude()),
    latitude: parseFloat(faker.address.latitude()),
  };

  it("Should be able to create an terrain", async (done) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/farm/terrain",
      headers: {
        Authorization: token,
      },
      payload: newTerrain,
    });

    const res = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(res.latitude).toBe(newTerrain.latitude);
    expect(res.longitude).toBe(newTerrain.longitude);
    expect(res.type).toBe(newTerrain.type);
    expect(res.name).toBe(newTerrain.name);
    expect(res.id).toBeDefined();

    done();
  });
});
