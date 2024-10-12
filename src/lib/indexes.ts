import abilities from "@/data/abilities.json";
import { toDictionary } from "./utils";
import { Ability } from "./game-types";

export const abilitiesByName = toDictionary(abilities, (a) => a.name) as Record<
  string,
  Ability
>;
