import { EventEmitter } from "events";

import { ConnectEventEmitter, Subscribe, Emit } from "./events";

let eventEmitter: EventEmitter;

export const connect: ConnectEventEmitter = async () => {
  eventEmitter = new EventEmitter();
  return true;
};

export const subscribe: Subscribe = (
  evtName: string,
  listener: (...args: unknown[]) => void
) => {
  return new Promise((resolve) => {
    eventEmitter.on(evtName, listener);
    resolve();
  });
};

export const emit: Emit = (evtName: string, data: unknown) => {
  return new Promise((resolve) => {
    eventEmitter.emit(evtName, data);
    resolve();
  });
};
