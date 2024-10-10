import { Draft } from "immer";

export interface Pilot {
  callSign: string;
  class: string;
  appearance: string;
  motto: PilotUsable;
  keepsake: PilotUsable;
  background: PilotUsable;
}

export interface PilotUsable {
  value: string;
  used: boolean;
}

export interface RollTable {
  "1": string;
  "20": string;
  "11-19": string;
  "6-10": string;
  "2-5": string;
}

export interface RollResult {
  value: number;
  text: string;
}

export interface Children {
  children?: React.ReactNode;
}

export interface ClassName {
  className?: string;
}

export interface ILensBase<T> {
  state: T;
  setState: Setter<T>;
}

export interface ILens<T> extends ILensBase<T> {
  sub<K extends keyof T>(key: K): ILens<T[K]>;
}

export type Setter<T> = (r: (d: Draft<T>) => Draft<T> | T | void) => void;
