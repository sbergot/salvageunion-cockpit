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
  hp: { value: number; max: number };
  ap: { value: number; max: number };
  tp: { value: number };
  inventory: string[];
  abilities: Ability[];
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
  apCost: number | "Variable";
  range?: Range;
  actionType?: ActionType;
  traits: Trait[];
  rollTable?: RollTable;
}

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

export interface PilotUsable {
  value: string;
  used: boolean;
}
