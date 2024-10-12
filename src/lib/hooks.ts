import { useMemo } from "react";
import { uuidv4 } from "./utils";
import useLocalStorage from "use-local-storage";
import { Draft, produce } from "immer";
import { useImmer } from "use-immer";
import { ILens, ILensBase, makeLens } from "./lens/lens";

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
  return makeLens({ state: value, setState: setImmerValue });
}

export function useLens<T>(defaultValue: T): ILensBase<T> {
  const [state, setState] = useImmer(defaultValue);
  return { state, setState };
}

