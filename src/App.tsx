import {
  Block,
  BlockField,
  BlockLabel,
  BlockStat,
  BlockStatTp,
} from "./components/ui/block";
import { Children, Pilot } from "./types";
import { useImmerLocalStorage } from "./lib/hooks";
import { importPilot, newPilot } from "./lib";
import { pilot_json } from "./test_sb";

function Title({ children }: Children) {
  return (
    <h1 className="text-3xl font-bold bg-black text-white inline">
      {children}
    </h1>
  );
}

function PilotSheet() {
  const pilotLens = useImmerLocalStorage<Pilot>("pilot", importPilot(pilot_json));
  return (
    <div className="m-4 flex flex-col gap-4 items-start">
      <Header />
      <div className="flex gap-1">
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
          <BlockStatTp
            title="TP"
            valueLens={pilotLens.sub("tp").sub("value")}
          />
        </Block>
      </div>
      <Block className="flex flex-col">
        <BlockLabel>Inventory</BlockLabel>
        <div className="grid grid-cols-3 bg-neutral-100 rounded-xl inventory-grid">
          {pilotLens.state.inventory.map((v, i) => (
            <textarea
              key={i}
              className="w-52 h-20 resize-none outline-none p-2 text-black text-sm"
              value={pilotLens.state.inventory[i]}
              onChange={(e) => pilotLens.sub("inventory").sub(i).setState(() => e.target.value)}
            />
          ))}
        </div>
      </Block>
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
    <div className="w-full max-w-5xl m-auto">
      <PilotSheet />
    </div>
  );
}

export default App;
