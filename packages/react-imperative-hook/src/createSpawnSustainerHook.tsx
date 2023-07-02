import type { Context } from "react";
import { useContext, useEffect, useMemo } from "react";
import type { ComponentStore, InstanceId } from "./ComponentStore";
import type { Deferred } from "./deferPromise";
import { deferPromise } from "./deferPromise";

export function createSpawnSustainerHook(context: Context<ComponentStore>) {
  return function useSpawnSustainer({
    instanceId,
  }: UseSpawnSustainerProps): Deferred<void> {
    const sustainer = useMemo(deferPromise, []);
    const store = useContext(context);
    useEffect(() => {
      store.setInstanceRemoveDelay(instanceId, sustainer.promise);
      return () => store.setInstanceRemoveDelay(instanceId, undefined);
    }, [store, instanceId]);
    return sustainer;
  };
}

export interface UseSpawnSustainerProps {
  instanceId: InstanceId;
}
