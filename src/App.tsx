import { PilotSheet } from "./components/pages/pilot-sheet";
import { Children } from "./types";

function Title({ children }: Children) {
  return (
    <h1 className="text-3xl font-bold bg-black text-white inline">
      {children}
    </h1>
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
    <div className="w-full max-w-2xl m-auto flex flex-col gap-4 items-start">
      <Header />
      <PilotSheet />
    </div>
  );
}

export default App;
