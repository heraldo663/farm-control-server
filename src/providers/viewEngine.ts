import Handlebars from "handlebars";

const preComPileData = {};

export function compile(source: string, name: string): void {
  const template = Handlebars.compile(source);
  preComPileData[name] = template;
}

export function render<T>(name: string, data: unknown | T): string {
  try {
    return preComPileData[name](data);
  } catch (err) {
    return "";
  }
}
