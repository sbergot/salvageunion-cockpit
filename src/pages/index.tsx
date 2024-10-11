import { Button } from "@/components/ui/button";
import { DeleteAlert } from "@/components/ui/delete-alert";
import { FileImport } from "@/components/ui/file-import";
import { StrongEmph } from "@/components/ui/typography";
import { downloadJson, importPilot } from "@/lib";
import { useImmerLocalStorage } from "@/lib/hooks";
import { Link } from "@/router";
import { Pilot } from "@/types";
import { PlayIcon, Trash2Icon, UploadIcon } from "lucide-react";

export default function Index() {
  const pilotsLens = useImmerLocalStorage<Record<string, Pilot>>("pilots", {});
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sared-200 text-lg">Pilots</div>
      <div className="flex gap-1">
        <FileImport
          label="import pilot"
          onUpLoad={(content) => {
            pilotsLens.setState((pilots) => {
              const newPilot = importPilot(content);
              pilots[newPilot.id] = newPilot;
            });
          }}
        />
        <Button onClick={() => downloadJson("pilots", pilotsLens.state)}>
          <UploadIcon className="mr-2" />
          export pilots
        </Button>
      </div>
      {Object.values(pilotsLens.state).map((pilot) => (
        <div className="flex justify-between border-2 p-2 rounded-lg border-sared-100">
          <div className="text-lg">{pilot.callsign}</div>
          <div className="flex gap-2">
            <Link to="/pilot/:id" params={{ id: pilot.id }}>
              <Button size="sm" variant="ghost" className="text-sared-100"><PlayIcon /></Button>
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
