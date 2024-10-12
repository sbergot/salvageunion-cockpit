import {
  PilotStats,
  PilotInventory,
  PilotAbilities,
} from "@/components/pages/pilot-sheet";
import { Pilot } from "@/lib/game-types";
import { useImmerLocalStorage } from "@/lib/hooks";
import { useParams } from "@/router";

export default function PilotSheet() {
  const { id } = useParams('/pilot/:id');
  const pilotsLens = useImmerLocalStorage<Record<string, Pilot>>("pilots", {});
  const pilotLens = pilotsLens.sub(id);
  return (
    <div className="flex flex-col gap-2">
      <PilotStats pilotLens={pilotLens} />
      <PilotInventory inventoryLens={pilotLens.sub("inventory")} />
      <PilotAbilities abilitiesLens={pilotLens.sub("abilities")} />
    </div>
  );
}
