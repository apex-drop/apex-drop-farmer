import { cn } from "@/lib/utils";

export default function Input({ ...props }) {
  return (
    <input
      className={cn(
        "px-4 py-2",
        "rounded-lg",
        "bg-neutral-800",
        "outline-0 ring-1 ring-transparent",
        "focus:ring-green-500",
        props.disabled && "opacity-50",
        props.className
      )}
      {...props}
    />
  );
}