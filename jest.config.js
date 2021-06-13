/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: path.join(__dirname, "prisma", "prisma-test-environment.js"),
  moduleDirectories: ["node_modules", "src"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  // moduleNameMapper: {
  //     "^@database/(.*)$": path.resolve(__dirname, "./src/database/$1"),
  //     "^@modules/(.*)$": path.resolve(__dirname, "./src/modules/$1"),
  //     "^@lib/(.*)$": path.resolve(__dirname, "./src/lib/$1"),
  //     "^@server/(.*)$": path.resolve(__dirname, "./src/server/$1"),
  // }
};
