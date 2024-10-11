import * as React from "react";

import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { ILensBase } from "@/types";

const Block = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl p-2 bg-sared-200 text-neutral-100 flex flex-wrap",
      className
    )}
    {...props}
  />
));
Block.displayName = "Block";

const BlockLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-lg", className)} {...props} />
));
BlockLabel.displayName = "BlockLabel";

export interface BlockFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  value: string;
  usedLens?: ILensBase<boolean>;
}

const BlockField = React.forwardRef<HTMLDivElement, BlockFieldProps>(
  ({ usedLens, title, value, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="flex justify-between">
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
      <div className="rounded-xl bg-neutral-100 p-2 text-black w-48">
        {value}
      </div>
    </div>
  )
);
BlockField.displayName = "BlockField";

export interface BlockStatProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  valueLens: ILensBase<number>;
  max: number;
}

const BlockStat = React.forwardRef<HTMLDivElement, BlockStatProps>(
  ({ title, valueLens, max, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <BlockLabel className="text-center">{title}</BlockLabel>
      <div className="flex items-center">
        <div className="text-vertical text-sm text-neutral-100">Current</div>
        <div className="rounded-xl flex justify-between bg-neutral-100">
          <input
            type="number"
            className="rounded-xl bg-neutral-100 text-black py-2 px-1 w-8 self-stretch outline-none text-right"
            onChange={(e) => {
              valueLens.setState(() => parseInt(e.target.value));
            }}
            value={valueLens.state}
          />
          <div className="rounded-xl bg-neutral-100 text-black py-2 pr-2 self-stretch">
            / {max}
          </div>
        </div>
        <div className="text-vertical2 text-sm text-neutral-100">Max</div>
      </div>
    </div>
  )
);
BlockStat.displayName = "BlockStat";

export interface BlockStatTpProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  valueLens: ILensBase<number>;
}

const BlockStatTp = React.forwardRef<HTMLDivElement, BlockStatTpProps>(
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
BlockStatTp.displayName = "BlockStatTp";

export { Block, BlockField, BlockStat, BlockStatTp, BlockLabel };
