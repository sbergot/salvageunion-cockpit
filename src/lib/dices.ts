export type RollTable = Record<string, string>;

export interface RollResult {
  value: number;
  text: string;
}

type Range = number[];

function parseRange(strRange: string): Range {
  if (/^\d+$/.test(strRange)) {
    return [parseInt(strRange)]
  }

  const match = /(\d+)-(\d+)/.exec(strRange);
  if (!match) {
    throw new Error(`invalid range: ${strRange}`);
  }
  const lower = parseInt(match[1]);
  const higher = parseInt(match[2]);
  const result = [];
  for (let i = lower; i <= higher; i++) {
    result.push(i);
  }
  return result;
}

function matchRange(range: Range, value: number) {
  return range.includes(value);
}

function simpleRoll(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

function matchValue(table: RollTable, value: number): string {
  for (let strRange in table) {
    if (matchRange(parseRange(strRange), value)) {
      return table[strRange];
    }
  }
  throw new Error(`could not match value: ${value}`);
}

export function roll(table: RollTable): RollResult {
  const value = simpleRoll(20);
  const text = matchValue(table, value);
  return { value, text };
}
