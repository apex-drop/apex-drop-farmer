import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function useProcessLock() {
  const [controller, setController] = useState(null);
  const [started, setStarted] = useState(false);
  const [locked, setLocked] = useState(false);

  /** Start Process */
  const start = useCallback(() => {
    controller?.abort();
    setController(new AbortController());
    setStarted(true);
    setLocked(false);
  }, [controller, setController, setStarted, setLocked]);

  /** Stop Process */
  const stop = useCallback(() => {
    controller?.abort();
    setController(null);
    setStarted(false);
    setLocked(false);
  }, [controller, setController, setStarted, setLocked]);

  /** Toggle */
  const toggle = useCallback(() => {
    if (!started) {
      start();
    } else {
      stop();
    }
  }, [started, start, stop]);

  /** Lock Process */
  const lock = useCallback(() => {
    setLocked(true);
  }, [setLocked]);

  /** Unlock Process */
  const unlock = useCallback(() => {
    setLocked(false);
  }, [setLocked]);

  return useMemo(
    () => ({
      started,
      locked,
      controller,
      start,
      stop,
      toggle,
      lock,
      unlock,
    }),
    [started, locked, controller, start, stop, toggle, lock, unlock]
  );
}
