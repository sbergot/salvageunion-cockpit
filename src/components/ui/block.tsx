import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"
import { ILensBase } from "@/types"



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
))
Block.displayName = "Block"

export interface BlockFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  title: string;
  value: string;
  usedLens?: ILensBase<boolean>;
}

const BlockField = React.forwardRef<
  HTMLDivElement,
  BlockFieldProps
>(({ usedLens, title, value, className, ...props }, ref) => (
  <div 
  ref={ref}
  className={cn(
    "flex flex-col gap-1",
    className
  )}
  {...props}>
  <div className="flex justify-between">
    <div className="text-lg">{title}</div>
    {usedLens !== undefined && <div>
      Used <Checkbox checked={usedLens.state} onClick={() => usedLens.setState(c => !c)} />
    </div>}
  </div>
  <div className="rounded-xl bg-neutral-100 p-2 w-48">{value}</div>
</div>
))
BlockField.displayName = "BlockField"



export { Block, BlockField }