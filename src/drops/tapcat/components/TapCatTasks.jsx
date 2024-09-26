import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useTapCatCompleteTaskMutation from "../hooks/useTapCatCompleteTaskMutation";
import useTapCatTasksQuery from "../hooks/useTapCatTasksQuery";

export default function TapCatTasks() {
  const client = useQueryClient();
  const tasksQuery = useTapCatTasksQuery();

  const tasks = useMemo(() => tasksQuery.data || [], [tasksQuery.data]);

  const completedTasks = useMemo(
    () => tasks.filter((item) => item["is_completed_task"]),
    [tasks]
  );

  const uncompletedTasks = useMemo(
    () => tasks.filter((item) => !item["is_completed_task"]),
    [tasks]
  );

  const completeTaskMutation = useTapCatCompleteTaskMutation();

  const [autoClaiming, setAutoClaiming] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskOffset, setTaskOffset] = useState(null);

  const reset = () => {
    setCurrentTask(null);
    setTaskOffset(null);
  };

  /** Handle button click */
  const handleAutoTaskClick = () => {
    reset();
    setAutoClaiming((previous) => !previous);
  };

  useEffect(() => {
    if (!autoClaiming) {
      return;
    }

    (async function name() {
      for (let [index, task] of Object.entries(uncompletedTasks)) {
        setTaskOffset(index);
        setCurrentTask(task);
        try {
          await completeTaskMutation.mutateAsync(task["id"]);
        } catch {}

        /** Delay */
        await delay(3_000);
      }

      try {
        await client.refetchQueries({
          queryKey: ["tapcat", "tasks"],
        });
        await client.refetchQueries({
          queryKey: ["tapcat", "profile"],
        });
      } catch {}

      reset();
      setAutoClaiming(false);
    })();
  }, [autoClaiming]);

  return (
    <div className="p-4">
      {tasksQuery.isPending ? (
        <div className="flex justify-center">Loading...</div>
      ) : // Error
      tasksQuery.isError ? (
        <div className="flex justify-center text-orange-500">
          Failed to fetch tasks...
        </div>
      ) : (
        // Success
        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-2 text-black bg-white rounded-lg">
            <p>
              <span className="font-bold text-blue-500">Tasks</span>:{" "}
              <span className="font-bold">{completedTasks.length}</span> /{" "}
              <span className="font-bold">{tasks.length}</span>
            </p>
          </div>
          <button
            disabled={autoClaiming}
            onClick={handleAutoTaskClick}
            className={cn(
              "p-2 rounded-lg disabled:opacity-50",
              autoClaiming ? "bg-white text-black" : "bg-black text-white"
            )}
          >
            {autoClaiming ? "Stop" : "Start"}
          </button>

          {autoClaiming && currentTask ? (
            <div className="flex flex-col gap-2 p-4 bg-black rounded-lg">
              <h4 className="font-bold">
                <span className="text-yellow-500">
                  Running Task {taskOffset !== null ? +taskOffset + 1 : null}
                </span>
              </h4>
              <h5 className="font-bold">{currentTask.title}</h5>
              <p
                className={cn(
                  "capitalize",
                  {
                    success: "text-green-500",
                    error: "text-red-500",
                  }[completeTaskMutation.status]
                )}
              >
                {completeTaskMutation.status}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
