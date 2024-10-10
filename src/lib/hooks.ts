import { useMemo } from "react";
import { uuidv4 } from "./utils";
import useLocalStorage from "use-local-storage";
import { Draft, produce } from "immer";
import { useImmer } from "use-immer";
import { ILens } from "../types";

export function useBrowserId(): string {
  return useMemo(() => {
    const key = "browser_id";
    const cached = localStorage.getItem(key);
    if (cached) {
      return cached;
    }
    const newId = uuidv4();
    localStorage.setItem(key, newId);
    return newId;
  }, []);
}

export function useImmerLocalStorage<T>(
  key: string,
  defaultValue: T
): ILens<T> {
  const [value, setValue] = useLocalStorage(key, defaultValue, {
    syncData: true,
  });
  function setImmerValue(recipe: (v: Draft<T>) => void): void {
    setValue((oldVal: T | undefined) =>
      produce<T>(oldVal ?? defaultValue, (d) => recipe(d))
    );
  }
  return { state: value, setState: setImmerValue };
}

export function useLens<T>(defaultValue: T): ILens<T> {
  const [state, setState] = useImmer(defaultValue);
  return { state, setState };
}

export function getSubLens<T, K extends keyof T>(
  lens: ILens<T>,
  key: K
): ILens<T[K]> {
  return {
    state: lens.state[key],
    setState: (recipe) => lens.setState((d) => {
      const result = recipe((d as any)[key]);
      if (result !== undefined) {
        (d as any)[key] = result as any;
      }
    }),
  };
}

export function getSubRecordLens<T>(
  lens: ILens<Record<string, T>>,
  key: string
): ILens<T> {
  return {
    state: lens.state[key],
    setState: (recipe) => lens.setState((d) => {
      const result = recipe(d[key]);
      if (result !== undefined) {
        d[key] = result as any;
      }
    }),
  };
}