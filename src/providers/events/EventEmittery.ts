import Emittery from "emittery";

import { ConnectEventEmitter, Subscribe, Emit } from "./events";

let eventEmitter: Emittery;

export const connect: ConnectEventEmitter = async () => {
  eventEmitter = new Emittery();
  return true;
};

export const subscribe: Subscribe = (evtName: string, listener) => {
  return new Promise((resolve) => {
    eventEmitter.on(evtName, listener);
    resolve();
  });
};

export const emit: Emit = (evtName: string, data: unknown) => {
  return eventEmitter.emit(evtName, data);
};
