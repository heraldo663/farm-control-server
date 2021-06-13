/* eslint-disable @typescript-eslint/no-var-requires */
const util = require("util");
const NodeEnvironment = require("jest-environment-node");
const exec = util.promisify(require("child_process").exec);

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    require("dotenv").config();
    for (const key in process.env) {
      this.global.process.env[key] = process.env[key];
    }

    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
    this.global.process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
  }

  async setup() {
    // Run the migrations to ensure our schema has the required structure
    await exec("npx prisma migrate reset --force");

    return super.setup();
  }
}

module.exports = PrismaTestEnvironment;
