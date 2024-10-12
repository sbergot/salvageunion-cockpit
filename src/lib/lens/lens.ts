import { Draft } from "immer";

export interface ILensBase<T> {
  state: T;
  setState: Setter<T>;
}

export interface ILens<T> extends ILensBase<T> {
  sub<K extends keyof T>(key: K): ILens<T[K]>;
}

export type Setter<T> = (r: (d: Draft<T>) => Draft<T> | T | void) => void;

function getSubLens<T, K extends keyof T>(
  lens: ILensBase<T>,
  key: K
): ILensBase<T[K]> {
  return {
    state: lens.state[key],
    setState: (recipe) =>
      lens.setState((d) => {
        const result = recipe((d as any)[key]);
        if (result !== undefined) {
          (d as any)[key] = result as any;
        }
      }),
  };
}

export function makeLens<T>(lensBase: ILensBase<T>): ILens<T> {
  return {
    ...lensBase,
    sub<K extends keyof T>(key: K): ILens<T[K]> {
      const base = getSubLens(lensBase, key);
      return makeLens(base);
    },
  };
}

export function getSubRecordLens<T>(
  lens: ILensBase<Record<string, T>>,
  key: string
): ILensBase<T> {
  return {
    state: lens.state[key],
    setState: (recipe) =>
      lens.setState((d) => {
        const result = recipe(d[key]);
        if (result !== undefined) {
          d[key] = result as any;
        }
      }),
  };
}
