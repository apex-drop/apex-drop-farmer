import { cn } from "@/lib/utils";

export default function HrumTaskButton({ icon, title, reward, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "w-full",
        "flex items-center gap-2 p-2 rounded-lg bg-white/50",
        "text-left",
        props.className
      )}
    >
      <img src={icon} className="w-10 h-10 rounded-full shrink-0" />
      <div>
        <h1 className="font-bold">{title}</h1>
        <p className="text-white">
          +{Intl.NumberFormat().format(reward)} $HRUM
        </p>
      </div>
    </button>
  );
}
