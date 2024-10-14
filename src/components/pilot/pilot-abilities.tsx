import { Block, BlockLabel, BlockSection } from "../ui/block";
import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  RulerIcon,
  TimerIcon,
  WrenchIcon,
} from "lucide-react";
import { ILens } from "@/lib/lens";
import { Ability } from "@/lib/game-types";
import { AbilityRoll } from "./roll-abilities";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { getAvailableTreeLevels, TreeLevel } from "@/lib/ability-trees";
import { abilitiesByTree } from "@/lib/indexes";
import { cn } from "@/lib/utils";

function AbilityPreview({
  ability,
  owned,
}: {
  ability: Ability;
  owned: boolean;
}) {
  return (
    <Block className={cn("flex-col", !owned && "bg-sared-200/50")}>
      <div className="font-bold">{ability.name}</div>
      <div className="text-sm text-start">{ability.description}</div>
    </Block>
  );
}

function LegendaryTreeDisplay({
  tree,
  abilitiesLens,
}: {
  tree: TreeLevel;
  abilitiesLens: ILens<Ability[]>;
}) {
  const isLearned = tree.level === 1;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <div>{tree.name}</div>
        {isLearned ? (
          <Button
            disabled={tree.level === 0}
            onClick={() => {
              abilitiesLens.setState((abilities) => {
                const toRemove = abilitiesLens.state.find(
                  (a) => a.tree === tree.name
                )!;
                const idx = abilities.findIndex(
                  (a) => a.name === toRemove.name
                );
                abilities.splice(idx, 1);
              });
            }}
          >
            unlearn
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                abilitiesLens.setState((a) => {
                  a.push(abilitiesByTree[tree.name][0]);
                });
              }}
            >
              learn first
            </Button>
            <Button
              onClick={() => {
                abilitiesLens.setState((a) => {
                  a.push(abilitiesByTree[tree.name][1]);
                });
              }}
            >
              learn second
            </Button>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {abilitiesByTree[tree.name].map((ability) => (
          <AbilityPreview
            key={ability.name}
            ability={ability}
            owned={
              abilitiesLens.state.findIndex((a) => a.name === ability.name) >= 0
            }
          />
        ))}
      </div>
    </div>
  );
}

function SingleTreeDisplay({
  tree,
  abilitiesLens,
}: {
  tree: TreeLevel;
  abilitiesLens: ILens<Ability[]>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <div>
          {tree.name} ({tree.level})
        </div>
        <Button
          disabled={tree.level === 0}
          onClick={() => {
            abilitiesLens.setState((abilities) => {
              const toRemove = abilitiesByTree[tree.name][tree.level - 1];
              const idx = abilities.findIndex((a) => a.name === toRemove.name);
              abilities.splice(idx, 1);
            });
          }}
        >
          <MinusIcon />
        </Button>
        <Button
          disabled={tree.level === 3}
          onClick={() => {
            abilitiesLens.setState((a) => {
              a.push(abilitiesByTree[tree.name][tree.level]);
            });
          }}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {abilitiesByTree[tree.name].map((ability) => (
          <AbilityPreview
            key={ability.name}
            ability={ability}
            owned={ability.level <= tree.level}
          />
        ))}
      </div>
    </div>
  );
}

function AbilityLearn({
  abilitiesLens,
  className,
}: {
  className: string;
  abilitiesLens: ILens<Ability[]>;
}) {
  const [open, setOpen] = useState(false);
  const availableTrees = getAvailableTreeLevels(className, abilitiesLens.state);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-neutral-100 px-1" size="fit">
          <PencilIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Available abilities</DialogTitle>
        <div className="flex flex-col gap-2 max-h-[40rem] overflow-y-scroll">
          {availableTrees.map((tree) =>
            tree.legendary ? (
              <LegendaryTreeDisplay
                key={tree.name}
                tree={tree}
                abilitiesLens={abilitiesLens}
              />
            ) : (
              <SingleTreeDisplay
                key={tree.name}
                tree={tree}
                abilitiesLens={abilitiesLens}
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PilotAbility({ ability }: { ability: Ability }) {
  const apCost = ability.apCost === "Variable" ? "X" : ability.apCost;
  const isEquipment =
    ability.traits &&
    ability.traits.findIndex((t) => t.type === "pilot equipment") >= 0;
  const isHacking =
    ability.traits &&
    ability.traits.findIndex((t) => t.type === "hacking") >= 0;
  return (
    <div className="flex flex-col gap-1" key={ability.name}>
      <BlockSection className="flex justify-between text-sm">
        {ability.name}{" "}
        {ability.rollTable && (
          <AbilityRoll name={ability.name} rollTable={ability.rollTable} />
        )}
      </BlockSection>
      <BlockSection className="text-sm flex-grow">
        {ability.effect}
      </BlockSection>
      <div className="flex flex-wrap gap-1">
        {apCost && (
          <BlockSection className="inline text-xs">AP: {apCost}</BlockSection>
        )}
        {ability.range && (
          <BlockSection className="flex text-xs">
            <RulerIcon size="20" /> <div>{ability.range}</div>
          </BlockSection>
        )}
        {ability.actionType && (
          <BlockSection className="flex text-xs">
            <TimerIcon size="20" /> <div>{ability.actionType}</div>
          </BlockSection>
        )}
        {isEquipment && (
          <BlockSection>
            <WrenchIcon size="20" />
          </BlockSection>
        )}
        {isHacking && <BlockSection className="text-xs">Hacking</BlockSection>}
      </div>
    </div>
  );
}

export function PilotAbilities({
  abilitiesLens,
  className,
}: {
  className: string;
  abilitiesLens: ILens<Ability[]>;
}) {
  return (
    <Block className="flex flex-col gap-2">
      <div className="flex gap-1">
        <BlockLabel>Abilities</BlockLabel>
        <AbilityLearn className={className} abilitiesLens={abilitiesLens} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
        {abilitiesLens.state.map((ability) => (
          <PilotAbility key={ability.name} ability={ability} />
        ))}
      </div>
    </Block>
  );
}
