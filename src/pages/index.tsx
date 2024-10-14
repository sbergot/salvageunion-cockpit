import { Button } from "@/components/ui/button";
import { DeleteAlert } from "@/components/ui/delete-alert";
import { FileImport } from "@/components/ui/file-import";
import { StrongEmph } from "@/components/ui/typography";
import { downloadJson } from "@/lib/download";
import { Pilot } from "@/lib/game-types";
import { useImmerLocalStorage } from "@/lib/hooks";
import { importPilot } from "@/lib/pilot";
import { Link } from "@/router";
import { DicesIcon, PlayIcon, Trash2Icon, UploadIcon } from "lucide-react";

export default function Index() {
  const pilotsLens = useImmerLocalStorage<Record<string, Pilot>>("pilots", {});
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
      <div className="text-lg">Standard tables roller:</div>
      <Link to="/tables" ><Button><DicesIcon /></Button></Link>
      </div>
      <div className="text-lg">
        To create a pilot, please visit{" "}
        <a href="https://www.salvageunionworkshop.com/pilot">
          https://www.salvageunionworkshop.com/pilot
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <FileImport
          label="import single pilot"
          onUpLoad={(content) => {
            pilotsLens.setState((pilots) => {
              const newPilot = importPilot(content);
              pilots[newPilot.id] = newPilot;
            });
          }}
        />
        <Button onClick={() => downloadJson("pilots", pilotsLens.state)}>
          <UploadIcon className="mr-2" />
          export all pilots
        </Button>
        <FileImport
          label="import all pilot"
          onUpLoad={(content) => {
            pilotsLens.setState(() => JSON.parse(content));
          }}
        />
      </div>
      {Object.values(pilotsLens.state).map((pilot) => (
        <div className="flex justify-between border-2 p-2 rounded-lg border-sared-100">
          <div className="text-lg">{pilot.callsign}</div>
          <div className="flex gap-2">
            <Link to="/pilot/:id" params={{ id: pilot.id }}>
              <Button size="sm" variant="ghost" className="text-sared-100">
                <PlayIcon />
              </Button>
            </Link>
            <DeleteAlert
              icon={
                <Button variant="destructive" size="sm">
                  <Trash2Icon />
                </Button>
              }
              onConfirm={() =>
                pilotsLens.setState((d) => {
                  delete d[pilot.id];
                })
              }
            >
              This will permanently delete the{" "}
              <StrongEmph>{pilot.callsign}</StrongEmph> pilot.
            </DeleteAlert>
          </div>
        </div>
      ))}
    </div>
  );
}
