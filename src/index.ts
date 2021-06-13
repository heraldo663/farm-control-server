import dotenv from "dotenv";
dotenv.config();

import createApp from "./app";

const PORT = process.env.APP_PORT ? process.env.APP_PORT : 4000;

const start = async () => {
  const app = await createApp();
  try {
    await app.listen(PORT, function (err, address) {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`server listening on ${address}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
