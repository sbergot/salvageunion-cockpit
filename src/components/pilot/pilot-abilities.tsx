import { Block, BlockLabel, BlockSection } from "../ui/block";
import { RulerIcon, TimerIcon } from "lucide-react";
import { ILens } from "@/lib/lens";
import { Ability, Pilot } from "@/lib/game-types";
import { AbilityRoll } from "./roll-abilities";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { getAvailableTrees } from "@/lib/ability-trees";

function AbilityLearn({ abilities, className }: { className: string, abilities: Ability[] }) {
  const [open, setOpen] = useState(false);
  const availableTrees = getAvailableTrees(
    className,
    abilities
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-neutral-100" size="fit">
          add ability
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Available abilities</DialogTitle>
        <div>
          {availableTrees.map((a) => (
            <Button>{a}</Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PilotAbility({ ability }: { ability: Ability }) {
  const apCost = ability.apCost === "Variable" ? "X" : ability.apCost;
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
      <div className="flex gap-1">
        <BlockSection className="inline order-3 text-sm">
          AP: {apCost}
        </BlockSection>
        {ability.range && (
          <BlockSection className="flex order-2 text-sm">
            <RulerIcon size="20" /> <div>{ability.range}</div>
          </BlockSection>
        )}
        <BlockSection className="flex order-1 text-sm">
          <TimerIcon size="20" /> <div>{ability.actionType}</div>
        </BlockSection>
      </div>
    </div>
  );
}

export function PilotAbilities({
  abilitiesLens,
  className
}: {
  className: string,
  abilitiesLens: ILens<Ability[]>;
}) {
  return (
    <Block className="flex flex-col">
      <BlockLabel>Abilities</BlockLabel>
      <AbilityLearn className={className} abilities={abilitiesLens.state} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
        {abilitiesLens.state.map((ability) => (
          <PilotAbility ability={ability} />
        ))}
      </div>
    </Block>
  );
}
