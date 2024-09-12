import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useAgent301CompleteTaskMutation from "../hooks/useAgent301CompleteTaskMutation";
import useAgent301TasksQuery from "../hooks/useAgent301TasksQuery";

export default function Agent301Tasks() {
  const client = useQueryClient();
  const tasksQuery = useAgent301TasksQuery();

  const tasks = useMemo(
    () => tasksQuery.data?.result?.data || [],
    [tasksQuery.data]
  );

  const partnerTasks = useMemo(
    () => tasks.filter((item) => item.category === "partners"),
    [tasks]
  );

  const claimedPartnerTasks = useMemo(
    () => partnerTasks.filter((item) => item["is_claimed"]),
    [partnerTasks]
  );

  const unClaimedPartnerTasks = useMemo(
    () => partnerTasks.filter((item) => !item["is_claimed"]),
    [partnerTasks]
  );

  const videoTask = useMemo(
    () => tasks.find((item) => item.type === "video"),
    [tasks]
  );

  const completeTaskMutation = useAgent301CompleteTaskMutation();

  const [autoClaiming, setAutoClaiming] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskOffset, setTaskOffset] = useState(null);
  const [action, setAction] = useState(null);

  const reset = () => {
    setAction(null);
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
      /** Beginning of Video Task */
      setAction("video");
      for (let i = videoTask["count"]; i < videoTask["max_count"]; i++) {
        setTaskOffset(i);
        setCurrentTask(videoTask);
        try {
          await completeTaskMutation.mutateAsync({
            type: videoTask["type"],
          });
        } catch {}
        await delay(10_000);
      }

      // Refetch Tasks List
      await client.refetchQueries({
        queryKey: ["agent301", "tasks"],
      });

      reset();

      /** Partners */
      setAction("partners");
      for (let [index, task] of Object.entries(unClaimedPartnerTasks)) {
        setTaskOffset(index);
        setCurrentTask(task);
        try {
          await completeTaskMutation.mutateAsync({
            type: task["type"],
          });
        } catch {}
        await delay(1000);
      }

      await client.refetchQueries({
        queryKey: ["agent301", "tasks"],
      });
      await client.refetchQueries({
        queryKey: ["agent301", "balance"],
      });

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
        <div className="flex justify-center text-red-500">
          Failed to fetch tasks...
        </div>
      ) : (
        // Success
        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-2 text-black bg-white rounded-lg">
            <p>
              <span className="font-bold text-purple-500">Video Tasks</span>:{" "}
              <span className="font-bold">{videoTask["count"]}</span> /{" "}
              <span className="font-bold">{videoTask["max_count"]}</span>
            </p>
            <p>
              <span className="font-bold text-blue-500">Partner Tasks</span>:{" "}
              <span className="font-bold">{claimedPartnerTasks.length}</span> /{" "}
              <span className="font-bold">{partnerTasks.length}</span>
            </p>
          </div>
          <button
            disabled={autoClaiming}
            onClick={handleAutoTaskClick}
            className={cn(
              "p-2 rounded-lg disabled:opacity-50",
              autoClaiming ? "bg-red-500 text-black" : "bg-white text-black"
            )}
          >
            {autoClaiming ? "Stop" : "Start"}
          </button>

          {autoClaiming && currentTask ? (
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral-800">
              <h4 className="font-bold">
                Current Mode:{" "}
                <span
                  className={
                    action === "video"
                      ? "text-yellow-500"
                      : "text-blum-green-500"
                  }
                >
                  {action === "video" ? "Video Task" : "Partner Tasks"}{" "}
                  {+taskOffset + 1}
                </span>
              </h4>
              <h5 className="font-bold">{currentTask.title}</h5>
              <p
                className={cn(
                  "capitalize",
                  {
                    success: "text-blum-green-500",
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
