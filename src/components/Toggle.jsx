import { cn } from "@/lib/utils";

export default function Toggle({ className, ...props }) {
  return (
    <>
      <input {...props} type="checkbox" value="" class="sr-only peer" />
      <div
        class={cn(
          "shrink-0",
          "relative w-11 h-6 rounded-full",
          "bg-neutral-200",
          "peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"
        )}
      ></div>
    </>
  );
}
