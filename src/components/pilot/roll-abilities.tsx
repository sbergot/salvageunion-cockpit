import { Button } from "../ui/button";
import { DicesIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { roll, RollResult, RollTable } from "@/lib/dices";

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

export function AbilityRoll({
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