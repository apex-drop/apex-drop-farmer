import { CgSpinner } from "react-icons/cg";
import useMajorTasksQuery from "../hooks/useMajorTasksQuery";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import StarIcon from "../assets/images/star-amount.svg";
import toast from "react-hot-toast";
import useMajorClaimTaskMutation from "../hooks/useMajorClaimTaskMutation";

export default function MajorTasks() {
  const tasksQuery = useMajorTasksQuery(true);
  const tasks = useMemo(
    () =>
      tasksQuery.data?.filter((task) =>
        ["subscribe_channel", "stories", "without_check"].includes(task.type)
      ) || [],
    [tasksQuery.data]
  );

  const claimTaskMutation = useMajorClaimTaskMutation();

  const claimTask = (id) => {
    toast
      .promise(claimTaskMutation.mutateAsync(id), {
        loading: "Claiming Task...",
        error: "Failed to Claim..",
        success: "Claimed Successfully",
      })
      .then(() => tasksQuery.refetch());
  };

  return tasksQuery.isPending ? (
    <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
  ) : tasksQuery.isError ? (
    <div className="text-center">Error....</div>
  ) : (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <button
          key={task.id}
          onClick={() => claimTask(task.id)}
          disabled={task["is_completed"]}
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg bg-neutral-50",
            "disabled:opacity-50",
            "text-left"
          )}
        >
          <img
            src={"https://major.bot" + task["icon_url"]}
            className="w-10 h-10 shrink-0"
          />
          <div className="flex flex-col min-w-0 grow">
            <h1 className="font-bold">{task["title"]}</h1>
            <p className="text-orange-500">
              +{Intl.NumberFormat().format(task["award"])}{" "}
              <img src={StarIcon} className="inline h-4" />
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
