import treeReqs from "@/data/ability-tree-requirements.json";
import { classesByName } from "./indexes";
import { Ability } from "./game-types";

export interface TreeLevel {
  name: string;
  level: number;
  legendary?: boolean;
}

const nextTreeGraph: Record<string, string> = (function () {
  const result: Record<string, string> = {};
  treeReqs.map((req) => {
    req.requirement.map((t) => {
      result[t] = req.tree;
    });
  });
  return result;
})();

function getTreeLevel(tree: string, abilities: Ability[]): TreeLevel {
  const level = abilities
    .filter((a) => a.tree === tree)
    .map((a) => a.level)
    .reduce((prev, current) => Math.max(prev, current), 0);
    return { name: tree, level };
}

export function getAvailableTreeLevels(className: string, abilities: Ability[]): TreeLevel[] {
    const coreTrees = classesByName[className].coreAbilities;
    const coreTreeLevels = coreTrees.map(t => getTreeLevel(t, abilities));
    if (abilities.length < 6) { return coreTreeLevels; }

    let advancedTrees: TreeLevel[] = [];
    coreTreeLevels.forEach(tree => {
        if (tree.level === 3) {
            advancedTrees.push(getTreeLevel(nextTreeGraph[tree.name], abilities));
        }
    });

    const advancedLevel = advancedTrees.map(t => t.level).reduce((p, c) => Math.max(p, c), 0);
    if (advancedLevel > 0) {
        advancedTrees = advancedTrees.filter(t => t.level > 0);
    }

    if (advancedLevel < 3) {
        return coreTreeLevels.concat(advancedTrees);
    }

    const legendaryTree: TreeLevel = getTreeLevel(nextTreeGraph[advancedTrees[0].name], abilities);
    legendaryTree.legendary = true;
    return [...coreTreeLevels, ...advancedTrees, legendaryTree];
}
