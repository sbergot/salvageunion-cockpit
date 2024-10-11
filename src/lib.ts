import { RollTable, RollResult, Pilot, WorkShopPilot, Ability } from "./types";
import abilities from "./data/abilities.json";
import { uuidv4 } from "./lib/utils";

function toDictionary<T>(rows: T[], select: (r: T) => string): Record<string, T> {
  const result: Record<string, T> = {};
  rows.forEach(r => {
    result[select(r)] = r;
  });
  return result;
}

const abilitiesByName = toDictionary(abilities, a => a.name) as Record<string, Ability>;

function simpleRoll(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

function matchValue(value: number): keyof RollTable {
  if (value === 1) { return "1" }
  if (value < 6) { return "2-5" }
  if (value < 11) { return "6-10" }
  if (value < 20) { return "11-19" }
  return "20";
}

export function roll(table: RollTable): RollResult {
  const value = simpleRoll(20);
  const text = table[matchValue(value)];
  return { value, text }
}

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
    tp: { value: 0 },
    inventory: ["", "", "", "", "", ""],
    abilities: []
  }
}

export function importPilot(json: string): Pilot {
  const workshopPilot: WorkShopPilot = JSON.parse(json);
  const gears = workshopPilot.ownedGear.map(g => g.name);
  for (let i=gears.length; i<6; i++) {
    gears.push("");
  }

  const abilities: Ability[] = workshopPilot.abilityIds.map(a => abilitiesByName[a]);

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
    tp: { value: workshopPilot.trainingPoints },
    inventory: gears,
    abilities: abilities    
  }
}

export function download(storageKey: string) {
  const filename = `${storageKey}.json`;
  const text = localStorage[storageKey];
  downLoadText(filename, text);
}

export function downloadJson(name: string, data: object) {
  const filename = `${name}.json`;
  const text = JSON.stringify(data, null, 2);
  downLoadText(filename, text);
}

function downLoadText(filename: string, text: string) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}