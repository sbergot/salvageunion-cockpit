import { RollTable } from "./dices";

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
  id: string;
  callsign: string;
  class: string;
  appearance: string;
  motto: PilotUsable;
  keepsake: PilotUsable;
  background: PilotUsable;
  hp: Gauge;
  ap: Gauge;
  tp: number;
  inventory: string[];
  abilities: Ability[];
}

export interface PilotUsable {
  value: string;
  used: boolean;
}

export type TreeType = "core" | "advanced" | "legendary";

export interface Tree {
  name: string;
  type: TreeType;
  abilities: Ability[];
}

export interface Ability {
  name: string;
  tree: string;
  level: number;
  description: string;
  effect: string;
  activationCost: Cost;
  range?: Range;
  actionType?: ActionType;
  traits: Trait[];
  rollTable?: RollTable;
}

export interface WorkshopMeck {
  name: string;
  appearance: string;
  quirk: string;
  customPatternName: string;
  installedSystems: Array<{ name: string; systemOrModule: 0 | 1 }>;
}

export interface Mech {
  chassis: string;
  pattern: string;
  sp: Gauge;
  ep: Gauge;
  heat: Gauge;
  systemSlots: number;
  moduleSlots: number;
  cargoCap: number;
  techLevel: number;
  salvageValue: number;
  chassisAbility: string;
  quirk: string;
  appearance: string;
  systems: System[];
  modules: Module[];
  cargo: string[];
}

export interface ModuleOrSystem {
  name: string;
  techLevel: number;
  slotsRequired: number;
  salvageValue: number;
  recommended: boolean;
  traits: Trait[];
  description: string;
  notes: string;
  activationCost: Cost;
  damage: Damage;
  range?: Range;
  actionType?: ActionType;
  rollTable?: RollTable;
  actions: Action[];
}

export interface System extends ModuleOrSystem {
  type: "system";
}

export interface Module extends ModuleOrSystem {
  type: "module";
}

export interface Action {
  name: string;
  description: string;
  effect: string;
  activationCost: Cost;
  range: Range;
  actionType: ActionType;
  traits: Trait[];
  damage: Damage;
  options: string[];
  rollTable?: RollTable;
}

export type Damage =
  | {
      type: "HP" | "SP";
      amount: number;
    }
  | { type: "special"; amount: "2d20" | "X SP" };

export interface Gauge {
  value: number;
  max: number;
}

export type Cost = number | "Variable";

export type Range = "Close" | "Medium" | "Long" | "Far" | "Close/Long";

export type ActionType =
  | "Passive"
  | "Free"
  | "Reaction"
  | "Turn"
  | "Short"
  | "Long"
  | "DownTime";

export type Trait =
  | { type: "pilot equipment" }
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
  | { type: "uses"; amount: number }
  | { type: "explosive"; amount: number }
  | { type: "burn"; amount: number }
  | { type: "hot"; amount: number }
  | { type: "multi-attack"; amount: number }
  | { type: "personnel capacity"; amount: number };
