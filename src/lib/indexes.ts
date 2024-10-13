import abilities from "@/data/abilities.json";
import classes from "@/data/classes.json";
import { toDictionary } from "./utils";
import { Ability } from "./game-types";

export const abilitiesByName = toDictionary(abilities, (a) => a.name) as Record<
  string,
  Ability
>;

export const classesByName = toDictionary(classes, (a) => a.name);
