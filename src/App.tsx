import {
  Block,
  BlockField,
  BlockLabel,
  BlockStat,
  BlockStatTp,
} from "./components/ui/block";
import { Ability, Children, ILens, Pilot } from "./types";
import { useImmerLocalStorage } from "./lib/hooks";
import { importPilot } from "./lib";
import { pilot_json } from "./test_sb";

function Title({ children }: Children) {
  return (
    <h1 className="text-3xl font-bold bg-black text-white inline">
      {children}
    </h1>
  );
}

function PilotStats({ pilotLens }: { pilotLens: ILens<Pilot> }) {
  return (
    <div className="flex gap-1 justify-between w-full">
      <div className="uppercase text-vertical text-8xl text-sared-200">
        Pilot
      </div>
      <Block className="grid grid-cols-2 gap-2">
        <BlockField title="Callsign" value={pilotLens.state.callsign} />
        <BlockField
          title="Motto"
          value={pilotLens.state.motto.value}
          usedLens={pilotLens.sub("motto").sub("used")}
        />
        <BlockField title="Class" value={pilotLens.state.class} />
        <BlockField
          title="Keepsake"
          value={pilotLens.state.keepsake.value}
          usedLens={pilotLens.sub("keepsake").sub("used")}
        />
        <BlockField title="Appearance" value={pilotLens.state.appearance} />
        <BlockField
          title="Background"
          value={pilotLens.state.background.value}
          usedLens={pilotLens.sub("background").sub("used")}
        />
      </Block>
      <Block className="flex flex-col gap-1">
        <BlockStat
          title="HP"
          valueLens={pilotLens.sub("hp").sub("value")}
          max={pilotLens.state.hp.max}
        />
        <BlockStat
          title="AP"
          valueLens={pilotLens.sub("ap").sub("value")}
          max={pilotLens.state.ap.max}
        />
        <BlockStatTp title="TP" valueLens={pilotLens.sub("tp").sub("value")} />
      </Block>
    </div>
  );
}

function PilotInventory({ inventoryLens }: { inventoryLens: ILens<string[]> }) {
  return (
    <Block className="flex flex-col">
      <BlockLabel>Inventory</BlockLabel>
      <div className="grid grid-cols-3 bg-neutral-100 rounded-xl inventory-grid">
        {inventoryLens.state.map((_, i) => (
          <textarea
            key={i}
            className="w-52 h-20 resize-none outline-none p-2 text-black text-sm"
            value={inventoryLens.state[i]}
            onChange={(e) =>
              inventoryLens.sub(i).setState(() => e.target.value)
            }
          />
        ))}
      </div>
    </Block>
  );
}

function PilotAbilities({
  abilitiesLens,
}: {
  abilitiesLens: ILens<Ability[]>;
}) {
  return (
    <Block className="flex flex-col">
      <BlockLabel>Abilities</BlockLabel>
      <div className="grid grid-cols-3 gap-2">
        {abilitiesLens.state.map((ability) => (
          <div className="flex flex-col gap-1" key={ability.name}>
            <div className="bg-neutral-100 rounded-xl text-black p-2">
              {ability.name}
            </div>
            <div className="bg-neutral-100 rounded-xl text-black p-2">
              {ability.description}
              <div className="text-sm">{ability.effect}</div>
            </div>
          </div>
        ))}
      </div>
    </Block>
  );
}

function PilotSheet() {
  const pilotLens = useImmerLocalStorage<Pilot>(
    "pilot",
    importPilot(pilot_json)
  );
  return (
    <div className="m-4 flex flex-col gap-4 items-start">
      <Header />
      <PilotStats pilotLens={pilotLens} />
      <PilotInventory inventoryLens={pilotLens.sub("inventory")} />
      <PilotAbilities abilitiesLens={pilotLens.sub("abilities")} />
    </div>
  );
}

function Header() {
  return (
    <div className="self-start">
      <Title>Salvage Union Cockpit</Title>
      <div>
        Salvage Union is published by Leyline Press -{" "}
        <a href="https://leyline.press/">https://leyline.press/</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="w-full max-w-2xl m-auto">
      <PilotSheet />
    </div>
  );
}

export default App;
