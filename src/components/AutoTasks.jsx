import useClaimTaskMutation from "@/hooks/useClaimTaskMutation";
import useStartTaskMutation from "@/hooks/useStartTaskMutation";
import useTasksQuery from "@/hooks/useTasksQuery";
import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import Button from "./Button";

export default function AutoTasks() {
  const client = useQueryClient();
  const query = useTasksQuery();

  const tasks = useMemo(
    () => query.data?.reduce((all, group) => all.concat(group.tasks), []) || [],
    [query.data]
  );

  const finishedTasks = useMemo(
    () => tasks.filter((item) => item.status === "FINISHED"),
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter((item) => item.status === "NOT_STARTED"),
    [tasks]
  );

  const unclaimedTasks = useMemo(
    () => tasks.filter((item) => item.status === "READY_FOR_CLAIM"),
    [tasks]
  );

  const [autoClaiming, setAutoClaiming] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskOffset, setTaskOffset] = useState(null);
  const [action, setAction] = useState(null);

  const startTaskMutation = useStartTaskMutation();
  const claimTaskMutation = useClaimTaskMutation();

  /** Handle button click */
  const handleAutoClaimClick = () => {
    setAction(null);
    setAutoClaiming((previous) => !previous);
  };

  useEffect(() => {
    if (!autoClaiming) {
      return;
    }

    (async function name() {
      if (!action) {
        setAction("start");
        return;
      }

      if (action === "start") {
        /** Beginning of Start Action */
        for (let [index, task] of Object.entries(pendingTasks)) {
          setTaskOffset(index);
          setCurrentTask(task);
          try {
            await startTaskMutation.mutateAsync(task.id);
          } catch {}
          await delay(1000);
          await startTaskMutation.reset();
        }
        await client.refetchQueries({
          queryKey: ["tasks"],
        });

        setCurrentTask(null);
        setAction("claim");

        /** End of Start Action */
      } else if (action === "claim") {
        /** Claim */
        for (let [index, task] of Object.entries(unclaimedTasks)) {
          setTaskOffset(index);
          setCurrentTask(task);
          try {
            await claimTaskMutation.mutateAsync(task.id);
          } catch {}
          await delay(1000);
          await claimTaskMutation.reset();
        }

        await client.refetchQueries({
          queryKey: ["tasks"],
        });
        setAutoClaiming(false);
        setAction(null);
        setCurrentTask(null);
      }
    })();
  }, [action, autoClaiming]);

  return (
    <div className="flex flex-col py-2">
      {query.isPending ? (
        <h4 className="font-bold">Fetching tasks...</h4>
      ) : query.isError ? (
        <h4 className="font-bold text-red-500">Failed to fetch tasks...</h4>
      ) : (
        <>
          {/* Tasks Info */}
          <h4 className="font-bold">Total Tasks: {tasks.length}</h4>
          <h4 className="font-bold text-green-500">
            Finished Tasks: {finishedTasks.length}
          </h4>
          <h4 className="font-bold text-yellow-500">
            Pending Tasks: {pendingTasks.length}
          </h4>
          <h4 className="font-bold text-purple-500">
            Unclaimed Tasks: {unclaimedTasks.length}
          </h4>

          <div className="flex flex-col gap-2 py-2">
            {/* Start Button */}
            <Button
              color={autoClaiming ? "danger" : "primary"}
              onClick={handleAutoClaimClick}
              disabled={
                (pendingTasks.length === 0 && unclaimedTasks.length === 0) ||
                autoClaiming
              }
            >
              {autoClaiming ? "Stop" : "Start"}
            </Button>

            {autoClaiming && currentTask ? (
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral-800">
                <h4 className="font-bold">
                  Current Mode:{" "}
                  <span
                    className={
                      action === "start" ? "text-yellow-500" : "text-green-500"
                    }
                  >
                    {action === "start" ? "Starting Task" : "Claiming Task"}{" "}
                    {+taskOffset + 1}
                  </span>
                </h4>
                <h5 className="font-bold">{currentTask.title}</h5>
                <p
                  className={cn(
                    "capitalize",
                    {
                      success: "text-green-500",
                      error: "text-red-500",
                    }[
                      action === "start"
                        ? startTaskMutation.status
                        : claimTaskMutation.status
                    ]
                  )}
                >
                  {action === "start"
                    ? startTaskMutation.status
                    : claimTaskMutation.status}
                </p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
