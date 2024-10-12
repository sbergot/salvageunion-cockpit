import { PilotAbilities } from "@/components/pilot/pilot-abilities";
import { PilotInventory } from "@/components/pilot/pilot-inventory";
import { PilotStats } from "@/components/pilot/pilot-stats";
import { Pilot } from "@/lib/game-types";
import { useImmerLocalStorage } from "@/lib/hooks";
import { useParams } from "@/router";

export default function PilotSheet() {
  const { id } = useParams("/pilot/:id");
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
