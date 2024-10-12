import { cn } from "@/lib/utils";
import React from "react";
import { BlockLabel, BlockSection } from "../ui/block";
import { Checkbox } from "../ui/checkbox";
import { ILensBase } from "@/lib/lens/lens";

export interface PilotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
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
      <BlockSection className="w-48">
        {value}
      </BlockSection>
    </div>
  )
);
PilotField.displayName = "PilotField";

export interface PilotStatProps extends React.HTMLAttributes<HTMLDivElement> {
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
        <div className="[writing-mode:tb-rl] rotate-180 text-sm text-neutral-100">Current</div>
        <div className="rounded-xl flex justify-between bg-neutral-100">
          <input
            type="number"
            className="rounded-xl bg-neutral-100 text-black py-2 px-1 w-8 self-stretch outline-none text-right"
            onChange={(e) => {
              valueLens.setState(() => parseInt(e.target.value));
            }}
            value={valueLens.state}
          />
          <BlockSection className="pl-0 self-stretch">
            / {max}
          </BlockSection>
        </div>
        <div className="[writing-mode:tb-rl] text-sm text-neutral-100">Max</div>
      </div>
    </div>
  )
);
PilotStat.displayName = "PilotStat";

export interface PilotStatTpProps extends React.HTMLAttributes<HTMLDivElement> {
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

export { PilotField, PilotStat, PilotStatTp }