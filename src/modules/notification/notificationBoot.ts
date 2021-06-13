import path from "path";
import { compile } from "providers/viewEngine";
import { readFile } from "utils/readFiles";

const emailTemplates = [
  { name: "welcome", path: path.resolve(__dirname, "view/welcomeUser.hbs") },
  {
    name: "forgotPassword",
    path: path.resolve(__dirname, "view/forgotPassword.hbs"),
  },
];

export const notificationBoot = (): void => {
  emailTemplates.forEach(async (template) => {
    const file = await readFile(template.path, { encoding: "utf-8" });
    compile(file, template.name);
  });
};
