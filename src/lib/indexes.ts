import allAbilities from "@/data/abilities.json";
import classes from "@/data/classes.json";
import { toDictionary, toDictionaryList } from "./utils";
import { Ability } from "./game-types";

export const abilitiesByName = toDictionary(allAbilities, (a) => a.name) as Record<
  string,
  Ability
>;

export const classesByName = toDictionary(classes, (a) => a.name);

export const abilitiesByTree = toDictionaryList(allAbilities, (a) => a.tree) as Record<
  string,
  Ability[]
>;

Object.values(abilitiesByTree).forEach(abilities => {
  abilities.sort((a,b) => a.level - b.level);
})
