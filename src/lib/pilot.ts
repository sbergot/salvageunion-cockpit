import { uuidv4 } from "./utils";
import { Ability, Pilot, WorkShopPilot } from "./game-types";
import { abilitiesByName } from "./indexes";

export function newPilot(): Pilot {
  return {
    id: uuidv4(),
    callsign: "call",
    class: "class",
    appearance: "app",
    motto: { value: "motto", used: false },
    keepsake: { value: "keep", used: false },
    background: { value: "back", used: false },
    hp: { value: 0, max: 6 },
    ap: { value: 0, max: 6 },
    tp: 0,
    inventory: ["", "", "", "", "", ""],
    abilities: [],
  };
}

export function importPilot(json: string): Pilot {
  const workshopPilot: WorkShopPilot = JSON.parse(json);
  const gears = workshopPilot.ownedGear.map((g) => g.name);
  for (let i = gears.length; i < 6; i++) {
    gears.push("");
  }

  const abilities: Ability[] = workshopPilot.abilityIds.map(
    (a) => abilitiesByName[a]
  );

  return {
    id: uuidv4(),
    callsign: workshopPilot.callsign,
    class: workshopPilot.coreClassId,
    appearance: workshopPilot.appearance,
    motto: { value: workshopPilot.motto, used: false },
    keepsake: { value: workshopPilot.keepsake, used: false },
    background: { value: workshopPilot.background, used: false },
    hp: { value: 6, max: 6 },
    ap: { value: 6, max: 6 },
    tp: workshopPilot.trainingPoints,
    inventory: gears,
    abilities: abilities,
  };
}
