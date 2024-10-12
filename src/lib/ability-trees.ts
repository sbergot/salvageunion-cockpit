import abilities from "@/data/abilities.json";
import { toDictionaryList } from "./utils";
import { abilitiesByName } from "./indexes";
import { Ability } from "./game-types";

const abilitiesByTree = toDictionaryList(abilities, a => a.tree) as Record<string, Ability[]>;

export function getNextAbility(abilityName: string): string | null {
    const ability = abilitiesByName[abilityName];
    if (ability.level === 3) {
        return null;
    }
    const treeAbilities = abilitiesByTree[ability.tree];
    const next = treeAbilities.find(a => a.level === (ability.level + 1))
    return next?.name ?? null;
}