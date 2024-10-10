import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Block, BlockField } from "./components/ui/block";
import { Children, Pilot } from "./types";
import { getSubLens, useImmerLocalStorage } from "./lib/hooks";
import { newPilot } from "./lib";

const re = /(.*?): (.*)/;

function Title({ children }: Children) {
  return (
    <h1 className="text-3xl font-bold bg-black text-white inline">
      {children}
    </h1>
  );
}

function Roller() {
  const pilotLens = useImmerLocalStorage<Pilot>("pilot", newPilot())
  return (
    <div className="m-4 flex flex-col gap-4 items-start">
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>title</CardTitle>
          <CardDescription>description bla bla</CardDescription>
        </CardHeader>
        <CardContent>
          content content content contentcontent content content content
        </CardContent>
        <CardFooter>footer</CardFooter>
      </Card>
      <Block>
        <div className="grid grid-cols-2 gap-2">
          <BlockField title="Callsign" value="foo bar" />
          <BlockField title="Motto" value="foo bar" usedLens={getSubLens(getSubLens(pilotLens, "motto"), "used")} />
          <BlockField title="Class" value="foo bar" />
          <BlockField title="Keepsake" value="foo bar" usedLens={getSubLens(getSubLens(pilotLens, "keepsake"), "used")} />
          <BlockField title="Appearance" value="foo bar" />
          <BlockField title="Background" value="foo bar" usedLens={getSubLens(getSubLens(pilotLens, "background"), "used")} />
        </div>
      </Block>
    </div>
  );
}

function Header() {
  return (
    <div className="self-start">
      <Title>Salvage Union Roller</Title>
      <div>
        Salvage Union is published by Leyline Press -{" "}
        <a href="https://leyline.press/">https://leyline.press/</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="w-full max-w-3xl m-auto">
      <Roller />
    </div>
  );
}

export default App;
