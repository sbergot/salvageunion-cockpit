import { RollTable, RollResult, Pilot } from "./types";

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
    callSign: "",
    class: "",
    appearance: "",
    motto: { value: "", used: false },
    keepsake: { value: "", used: false },
    background: { value: "", used: false },
  }
}