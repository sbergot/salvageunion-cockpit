import { Block, BlockLabel, BlockSection } from "../ui/block";
import { Button } from "../ui/button";
import { DicesIcon, RulerIcon, TimerIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ILens } from "@/lib/lens";
import { roll, RollResult, RollTable } from "@/lib/dices";
import { Ability } from "@/lib/game-types";

const re = /(.*?): (.*)/;

function Result({ result }: { result?: RollResult }) {
  if (!result) {
    return <div />;
  }
  const match = re.exec(result.text)!;
  if (!match) {
    return (
      <div>
        <div className="font-bold">Dice rolled: {result.value}</div>
        <div>{result.text}</div>
      </div>
    );
  }

  const title = match[1];
  const body = match[2];

  return (
    <div>
      <div className="font-bold">
        {result.value} - {title}
      </div>
      <div>{body}</div>
    </div>
  );
}

function AbilityRoll({
  rollTable,
  name,
}: {
  rollTable: RollTable;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [rollResult, setRollResult] = useState<RollResult | null>();
  function rollAbility(open: boolean, table: RollTable) {
    if (open) {
      setRollResult(roll(table));
    }
    setOpen(open);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        rollAbility(open, rollTable);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-neutral-100" size="fit">
          <DicesIcon size="20" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{name} ability roll result</DialogTitle>
        <Result result={rollResult!} />
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
}: {
  abilitiesLens: ILens<Ability[]>;
}) {
  return (
    <Block className="flex flex-col">
      <BlockLabel>Abilities</BlockLabel>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
        {abilitiesLens.state.map((ability) => (
          <PilotAbility ability={ability} />
        ))}
      </div>
    </Block>
  );
}
