import { cn } from "@/lib/utils";

export default function BlumButton({ color = "primary", ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2",
        "rounded-lg",
        {
          primary: "bg-blum-green-400 text-black",
          danger: "bg-red-400 text-black",
        }[color],
        props.disabled && "opacity-50",
        props.className
      )}
      {...props}
    />
  );
}
