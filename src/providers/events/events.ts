export type ConnectEventEmitter = () => Promise<boolean>;

type EventName = string | symbol;

export type Listeners<T = void> = (...args: unknown[] | T[]) => void;

export type RegisterFc = (subscribe: Subscribe) => void;

export type Subscribe = (
  evtName: EventName,
  listener: Listeners
) => Promise<void>;

export type Emit = (evtName: string, data: unknown) => Promise<void>;
