import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function useMapState() {
  const [map, setMap] = useState(new Map());

  /** Set map items */
  const addMapItems = useCallback(
    (handlersToAdd) => {
      setMap((prev) => {
        const newMap = new Map(prev);

        Object.entries(handlersToAdd).forEach(([k, v]) => newMap.set(k, v));

        return newMap;
      });
    },
    [setMap]
  );

  /** Remove map items */
  const removeMapItems = useCallback(
    (handlersToRemove) => {
      setMap((prev) => {
        const newMap = new Map(prev);

        Object.keys(handlersToRemove).forEach((k) => newMap.delete(k));

        return newMap;
      });
    },
    [setMap]
  );

  return useMemo(
    () => ({ map, addMapItems, removeMapItems }),
    [map, addMapItems, removeMapItems]
  );
}
