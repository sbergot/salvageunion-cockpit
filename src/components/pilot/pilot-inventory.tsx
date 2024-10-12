import { ILens } from "@/lib/lens";
import { Block, BlockLabel, BlockSection } from "../ui/block";

export function PilotInventory({
  inventoryLens,
}: {
  inventoryLens: ILens<string[]>;
}) {
  return (
    <Block className="flex flex-col">
      <BlockLabel>Inventory</BlockLabel>
      <BlockSection className="grid grid-cols-2 md:grid-cols-3 p-0 inventory-grid">
        {inventoryLens.state.map((_, i) => (
          <textarea
            key={i}
            className="h-20 resize-none outline-none p-2 text-black text-sm"
            value={inventoryLens.state[i]}
            onChange={(e) =>
              inventoryLens.sub(i).setState(() => e.target.value)
            }
          />
        ))}
      </BlockSection>
    </Block>
  );
}
