import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import BlumButton from "./BlumButton";
import useBlumClaimTaskMutation from "../hooks/useBlumClaimTaskMutation";
import useBlumStartTaskMutation from "../hooks/useBlumStartTaskMutation";
import useBlumTasksQuery from "../hooks/useBlumTasksQuery";
import useBlumValidateTaskMutation from "../hooks/useBlumValidateTaskMutation";

const reduceTasks = (tasks) =>
  tasks.reduce((items, current) => {
    if (current.subTasks) {
      return items.concat(reduceTasks(current.subTasks));
    }

    return items.concat(current);
  }, []);

export default function BlumAutoTasks() {
  const client = useQueryClient();
  const query = useBlumTasksQuery();

  const rawTasks = useMemo(
    () =>
      query.data
        ?.reduce((all, section) => {
          return all
            .concat(reduceTasks(section.tasks))
            .concat(
              section.subSections.reduce(
                (all, group) => all.concat(reduceTasks(group.tasks)),
                []
              )
            );
        }, [])
        .reduce((tasks, item) => {
          if (!tasks.some((task) => task.id === item.id)) {
            tasks.push(item);
          }
          return tasks;
        }, []) || [],
    [query.data]
  );

  const tasks = useMemo(
    () =>
      rawTasks.reduce((tasks, item) => {
        if (!tasks.some((task) => task.id === item.id)) {
          tasks.push(item);
        }
        return tasks;
      }, []),
    [rawTasks]
  );

  const finishedTasks = useMemo(
    () => tasks.filter((item) => item.status === "FINISHED"),
    [tasks]
  );

  const pendingTasks = useMemo(
    () =>
      tasks.filter(
        (item) =>
          item.status === "NOT_STARTED" &&
          !["ONCHAIN_TRANSACTION", "QUEST"].includes(item.kind)
      ),
    [tasks]
  );

  const unclaimedTasks = useMemo(
    () => tasks.filter((item) => item.status === "READY_FOR_CLAIM"),
    [tasks]
  );

  const unverifiedTasks = useMemo(
    () => tasks.filter((item) => item.status === "READY_FOR_VERIFY"),
    [tasks]
  );

  const [autoClaiming, setAutoClaiming] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskOffset, setTaskOffset] = useState(null);
  const [action, setAction] = useState(null);

  const startTaskMutation = useBlumStartTaskMutation();
  const claimTaskMutation = useBlumClaimTaskMutation();
  const validateTaskMutation = useBlumValidateTaskMutation();

  const resetTask = () => {
    setCurrentTask(null);
    setTaskOffset(null);
  };

  const reset = () => {
    resetTask();
    setAction(null);
  };

  /** Handle button click */
  const handleAutoClaimClick = () => {
    reset();
    setAutoClaiming((previous) => !previous);
  };

  const refetchTasks = () =>
    client.refetchQueries({
      queryKey: ["blum", "tasks"],
    });

  const refetchBalance = () =>
    client.refetchQueries({
      queryKey: ["blum", "balance"],
    });

  useEffect(() => {
    if (!autoClaiming) {
      return;
    }

    (async function () {
      if (!action) {
        setAction("start");
        return;
      }
      switch (action) {
        case "start":
          /** Beginning of Start Action */
          setAction("start");
          for (let [index, task] of Object.entries(pendingTasks)) {
            setTaskOffset(index);
            setCurrentTask(task);
            try {
              await startTaskMutation.mutateAsync(task.id);
            } catch {}

            /** Delay */
            await delay(2_000);
          }

          // Set Next Action
          try {
            await refetchTasks();
          } catch {}
          resetTask();
          setAction("verify");

          return;
        case "verify":
          /** Verify */
          for (let [index, task] of Object.entries(unverifiedTasks)) {
            setTaskOffset(index);
            setCurrentTask(task);
            try {
              let keyword = prompt(`Keyword: ${task.title}`);
              await validateTaskMutation.mutateAsync({ id: task.id, keyword });
            } catch {}

            /** Delay */
            await delay(2_000);
          }

          // Set Next Action
          try {
            await refetchTasks();
          } catch {}
          resetTask();
          setAction("claim");
          return;

        case "claim":
          /** Claim */
          for (let [index, task] of Object.entries(unclaimedTasks)) {
            setTaskOffset(index);
            setCurrentTask(task);
            try {
              await claimTaskMutation.mutateAsync({ id: task.id });
            } catch {}

            /** Delay */
            await delay(2_000);
          }
          break;
      }

      try {
        await refetchTasks();
        await refetchBalance();
      } catch {}

      resetTask();
      setAutoClaiming(false);
    })();
  }, [autoClaiming, action]);

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
          <h4 className="font-bold text-blum-green-500">
            Finished Tasks: {finishedTasks.length}
          </h4>
          <h4 className="font-bold text-yellow-500">
            Pending Tasks: {pendingTasks.length}
          </h4>
          <h4 className="font-bold text-blue-500">
            Unverified Tasks: {unverifiedTasks.length}
          </h4>

          <h4 className="font-bold text-purple-500">
            Unclaimed Tasks: {unclaimedTasks.length}
          </h4>

          <div className="flex flex-col gap-2 py-2">
            {/* Start Button */}
            <BlumButton
              color={autoClaiming ? "danger" : "primary"}
              onClick={handleAutoClaimClick}
              disabled={
                (pendingTasks.length === 0 && unclaimedTasks.length === 0) ||
                autoClaiming
              }
            >
              {autoClaiming ? "Stop" : "Start"}
            </BlumButton>

            {autoClaiming && currentTask ? (
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral-800">
                <h4 className="font-bold">
                  Current Mode:{" "}
                  <span
                    className={
                      action === "start"
                        ? "text-yellow-500"
                        : "text-blum-green-500"
                    }
                  >
                    {action === "start"
                      ? "Starting Task"
                      : action === "verify"
                      ? "Verifying Task"
                      : "Claiming Task"}{" "}
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
                    }[
                      action === "start"
                        ? startTaskMutation.status
                        : action === "verify"
                        ? validateTaskMutation.status
                        : claimTaskMutation.status
                    ]
                  )}
                >
                  {action === "start"
                    ? startTaskMutation.status
                    : action === "verify"
                    ? validateTaskMutation.status
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
