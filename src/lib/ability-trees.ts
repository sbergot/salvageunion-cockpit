import allAbilities from "@/data/abilities.json";
import treeReqs from "@/data/ability-tree-requirements.json";
import { toDictionary, toDictionaryList } from "./utils";
import { abilitiesByName, classesByName } from "./indexes";
import { Ability } from "./game-types";

const abilitiesByTree = toDictionaryList(allAbilities, (a) => a.tree) as Record<
  string,
  Ability[]
>;

const nextTreeGraph: Record<string, string> = (function () {
  const result: Record<string, string> = {};
  treeReqs.map((req) => {
    req.requirement.map((t) => {
      result[t] = req.tree;
    });
  });
  return result;
})();

function getTreeLevel(tree: string, abilities: Ability[]) {
  return abilities
    .filter((a) => a.tree === tree)
    .map((a) => a.level)
    .reduce((prev, current) => Math.max(prev, current), 0);
}

export function getAvailableTrees(className: string, abilities: Ability[]) {
    const coreTrees = classesByName[className].coreAbilities;
    if (abilities.length < 6) { return coreTrees; }

    let advancedTrees: string[] = [];
    coreTrees.forEach(tree => {
        if (getTreeLevel(tree, abilities) === 3) {
            advancedTrees.push(nextTreeGraph[tree]);
        }
    });

    const advancedTreeLevels = advancedTrees.map(t => ({ tree: t, level: getTreeLevel(t, abilities)}));

    const advancedLevel = advancedTreeLevels.map(t => t.level).reduce((p, c) => Math.max(p, c), 0);
    if (advancedLevel > 0) {
        advancedTrees = advancedTreeLevels.filter(t => t.level > 0).map(t => t.tree);
    }

    if (advancedLevel < 3) {
        return coreTrees.concat(advancedTrees);
    }

    const legendaryTree: string = nextTreeGraph[advancedTrees[0]];
    return [...coreTrees, ...advancedTrees, legendaryTree];
}
