import { useState } from "react";
import rows from "@/data/tables.json";
import { roll, RollResult } from "@/lib/dices";

const re = /(.*?): (.*)/;

function Result({ result }: { result: RollResult }) {
  const match = re.exec(result.text)!;
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

export default function Roller() {
  const [res, setRest] = useState<RollResult | null>();

  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 flex flex-col">
        {rows.map((row) => (
          <button
            key={row.name}
            className="bg-blue-100 hover:bg-blue-200 p-1 m-1 rounded-lg"
            onClick={() => setRest(roll(row.rollTable))}
          >
            {row.name}
          </button>
        ))}
      </div>
      <div className="flex-grow border-4 border-blue-100 rounded-xl p-4 text-xl">
        {res ? (
          <Result result={res} />
        ) : (
          <div className="w-full">Click on a button to start rolling!</div>
        )}
      </div>
    </div>
  );
}
