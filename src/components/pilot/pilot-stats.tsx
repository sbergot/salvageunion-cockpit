import { Pilot } from "@/lib/game-types";
import { ILens, ILensBase } from "@/lib/lens/lens";
import { cn } from "@/lib/utils";
import React from "react";
import { Block, BlockLabel, BlockSection } from "../ui/block";
import { Checkbox } from "../ui/checkbox";

export function PilotStats({ pilotLens }: { pilotLens: ILens<Pilot> }) {
  return (
    <div className="flex flex-col md:flex-row gap-1 justify-between w-full">
      <div className="uppercase md:[writing-mode:tb-rl] md:rotate-180 text-8xl text-sared-200">
        Pilot
      </div>
      <Block className="md:grid md:grid-cols-2 gap-2">
        <PilotField title="Callsign" value={pilotLens.state.callsign} />
        <PilotField
          title="Motto"
          value={pilotLens.state.motto.value}
          usedLens={pilotLens.sub("motto").sub("used")}
        />
        <PilotField title="Class" value={pilotLens.state.class} />
        <PilotField
          title="Keepsake"
          value={pilotLens.state.keepsake.value}
          usedLens={pilotLens.sub("keepsake").sub("used")}
        />
        <PilotField title="Appearance" value={pilotLens.state.appearance} />
        <PilotField
          title="Background"
          value={pilotLens.state.background.value}
          usedLens={pilotLens.sub("background").sub("used")}
        />
      </Block>
      <Block className="flex md:flex-col justify-between gap-1">
        <PilotStat
          title="HP"
          valueLens={pilotLens.sub("hp").sub("value")}
          max={pilotLens.state.hp.max}
        />
        <PilotStat
          title="AP"
          valueLens={pilotLens.sub("ap").sub("value")}
          max={pilotLens.state.ap.max}
        />
        <PilotStatTp title="TP" valueLens={pilotLens.sub("tp").sub("value")} />
      </Block>
    </div>
  );
}

interface PilotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  value: string;
  usedLens?: ILensBase<boolean>;
}

const PilotField = React.forwardRef<HTMLDivElement, PilotFieldProps>(
  ({ usedLens, title, value, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="flex justify-between items-baseline">
        <BlockLabel>{title}</BlockLabel>
        {usedLens !== undefined && (
          <div className="text-sm">
            Used{" "}
            <Checkbox
              checked={usedLens.state}
              onClick={() => usedLens.setState((c) => !c)}
            />
          </div>
        )}
      </div>
      <BlockSection className="w-48">{value}</BlockSection>
    </div>
  )
);
PilotField.displayName = "PilotField";

interface PilotStatProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  valueLens: ILensBase<number>;
  max: number;
}

const PilotStat = React.forwardRef<HTMLDivElement, PilotStatProps>(
  ({ title, valueLens, max, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <BlockLabel className="text-center">{title}</BlockLabel>
      <div className="flex items-center">
        <div className="[writing-mode:tb-rl] rotate-180 text-sm text-neutral-100">
          Current
        </div>
        <div className="rounded-xl flex justify-between bg-neutral-100">
          <input
            type="number"
            className="rounded-xl bg-neutral-100 text-black py-2 px-1 w-8 self-stretch outline-none text-right"
            onChange={(e) => {
              valueLens.setState(() => parseInt(e.target.value));
            }}
            value={valueLens.state}
          />
          <BlockSection className="pl-0 self-stretch">/ {max}</BlockSection>
        </div>
        <div className="[writing-mode:tb-rl] text-sm text-neutral-100">Max</div>
      </div>
    </div>
  )
);
PilotStat.displayName = "PilotStat";

interface PilotStatTpProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  valueLens: ILensBase<number>;
}

const PilotStatTp = React.forwardRef<HTMLDivElement, PilotStatTpProps>(
  ({ title, valueLens, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 items-center", className)}
      {...props}
    >
      <BlockLabel>{title}</BlockLabel>
      <input
        type="number"
        className="rounded-xl bg-neutral-100 text-black p-2 w-14 outline-none text-center"
        onChange={(e) => {
          valueLens.setState(() => parseInt(e.target.value));
        }}
        value={valueLens.state}
      />
    </div>
  )
);
PilotStatTp.displayName = "PilotStatTp";
