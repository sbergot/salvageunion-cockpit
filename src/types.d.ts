import { Draft } from "immer";

export interface WorkShopPilot {
  coreClassId: string;
  abilityIds: string[];
  callsign: string;
  appearance: string;
  motto: string;
  keepsake: string;
  background: string;
  ownedGear: { name: string }[];
  trainingPoints: number;
}

export interface Pilot {
  callsign: string;
  class: string;
  appearance: string;
  motto: PilotUsable;
  keepsake: PilotUsable;
  background: PilotUsable;
  hp: { value: number; max: number };
  ap: { value: number; max: number };
  tp: { value: number; };
  inventory: string[];
  abilities: Ability[];
}

export interface Ability {
  name: string;
  description: string;
  effect: string;
  apCost: number | "Variable";
  range?: Range
  actionType: ActionType;
  traits: Trait[];
  rollTable?: RollTable;
}

export type Range = "Close" | "Medium" | "Long" | "Far" | "Close/Long";

export type ActionType = "Passive" | "Free" | "Reaction" | "Turn" | "Short" | "Long" | "DownTime";

export type Trait =
    { type: "pilot equipment" }
  | { type: "hacking" }
  | { type: "melee" }
  | { type: "armor" }
  | { type: "rigging" }
  | { type: "ballistic" }
  | { type: "unwieldy" }
  | { type: "silent" }
  | { type: "communicator" }
  | { type: "salvaging" }
  | { type: "energy" }
  | { type: "heavy" }
  | { type: "shield" }
  | { type: "hover" }
  | { type: "anti-organic" }
  | { type: "overheat" }
  | { type: "climbing" }
  | { type: "missile" }
  | { type: "deadly" }
  | { type: "deadly (creatures only)" }
  | { type: "flashy" }
  | { type: "scanner" }
  | { type: "heat spike" }
  | { type: "optics" }
  | { type: "targeter" }
  | { type: "hot (x)" }
  | { type: "guided" }
  | { type: "jamming" }
  | { type: "pinning" }
  | { type: "escape" }
  | { type: "wield" }
  | { type: "anti-shielding" }
  | { type: "ion" }
  | { type: "amphibious" }
  | { type: "explosive (1d20)" }
  | { type: "heat hpike" }
  | { type: "hot (1d20)" }
  | { type: "wheeled" }
  | { type: "meld infection" }
  | { type: "irradiated" }
  | { type: "fast" }
  | { type: "immobile" }
  | { type: "poison" }
  | { type: "burrower" }
  | { type: "fly" }
  | { type: "load" }
  | { type: "uses", amount: number }
  | { type: "explosive", amount: number }
  | { type: "burn", amount: number }
  | { type: "hot", amount: number }
  | { type: "multi-attack", amount: number }
  | { type: "personnel capacity", amount: number }


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
