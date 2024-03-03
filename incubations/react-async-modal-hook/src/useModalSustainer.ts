import { useContext, useEffect, useMemo } from "react";
import type { InstanceId } from "./ModalStore";
import type { Deferred } from "./deferPromise";
import { deferPromise } from "./deferPromise";
import { ModalContext } from "./ModalContext";

export function useModalSustainer({
  instanceId,
}: UseSpawnSustainerProps): Deferred<void> {
  const sustainer = useMemo(deferPromise, []);
  const store = useContext(ModalContext);

  useEffect(() => {
    store.setInstanceRemoveDelay(instanceId, sustainer.promise);
    return () => store.setInstanceRemoveDelay(instanceId, undefined);
  }, [store, instanceId, sustainer.promise]);

  return sustainer;
}

export interface UseSpawnSustainerProps {
  instanceId: InstanceId;
}
