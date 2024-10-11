import * as React from "react";

import { cn } from "@/lib/utils";

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


const BlockSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-neutral-100 rounded-xl text-black p-2", className)} {...props} />
));
BlockSection.displayName = "BlockSection";

export { Block, BlockLabel, BlockSection };
