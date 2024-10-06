import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function useProcessLock() {
  const [controller, setController] = useState(null);
  const [started, setStarted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [process, setProcess] = useState({
    started: false,
    locked: false,
    controller: null,
    signal: null,
  });

  const canExecute = useMemo(
    () => process.started && !process.locked,
    [process]
  );

  /** Start Process */
  const start = useCallback(() => {
    setProcess((prev) => {
      prev?.controller?.abort();
      const controller = new AbortController();
      return {
        started: true,
        locked: false,
        controller,
        signal: controller.signal,
      };
    });
  }, [setProcess]);

  /** Stop Process */
  const stop = useCallback(() => {
    setProcess((prev) => {
      prev?.controller?.abort();
      return {
        started: false,
        locked: false,
        controller: null,
        signal: null,
      };
    });
  }, [setProcess]);

  /** Toggle */
  const toggle = useCallback(() => {
    if (!process.started) {
      start();
    } else {
      stop();
    }
  }, [process, start, stop]);

  /** Lock Process */
  const lock = useCallback(() => {
    setProcess((prev) => ({
      ...prev,
      locked: true,
    }));
  }, [setProcess]);

  /** Unlock Process */
  const unlock = useCallback(() => {
    setProcess((prev) => ({
      ...prev,
      locked: false,
    }));
  }, [setProcess]);

  return useMemo(
    () => ({
      ...process,
      canExecute,
      start,
      stop,
      toggle,
      lock,
      unlock,
    }),
    [process, canExecute, start, stop, toggle, lock, unlock]
  );
}
