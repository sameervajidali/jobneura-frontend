// src/components/ui/button.jsx
import { cn } from "@/lib/utils";

export function Button({ className, ...props }) {
  return (
    <button className={cn("px-4 py-2 rounded bg-primary text-white", className)} {...props} />
  );
}
