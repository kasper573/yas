import type { ComponentType } from "react";
import type { PartialByKeys } from "./utilityTypes";
import { deferPromise } from "./deferPromise";
import type { UseSpawnSustainerProps } from "./useModalSustainer";
import { Store } from "./Store";

export class ModalStore {
  // Remove delays are not part of the observable Store since they have no reactive impact.
  // They are pulled from the map when instances resolve.
  private removeDelays = new Map<InstanceId, Promise<void>>();

  constructor(private store = new Store<ModalStoreState>({})) {
    this.subscribe = this.store.subscribe.bind(this.store);
  }

  get state() {
    return this.store.state;
  }

  subscribe: Store<ModalStoreState>["subscribe"];

  upsertComponent(id: ComponentId, entry: UpsertComponentPayload) {
    return this.store.mutate((components) => {
      if (!components[id]) {
        components[id] = { instances: {}, ...entry };
      } else {
        Object.assign(components[id], entry);
      }
    });
  }

  removeComponents(ids: ComponentId[]) {
    return this.store.mutate((components) => {
      for (const id of ids) {
        delete components[id];
      }
    });
  }

  markComponentsForRemoval(ids: ComponentId[]) {
    return this.store.mutate((components) => {
      for (const id of ids) {
        const component = components[id];
        if (component) {
          component.shouldBeRemovedWhenEmpty = true;
        }
      }
    });
  }

  setInstanceRemoveDelay(instanceId: InstanceId, newDelay?: Promise<void>) {
    if (newDelay) {
      this.removeDelays.set(instanceId, newDelay);
    } else {
      this.removeDelays.delete(instanceId);
    }
  }

  removeInstance(componentId: ComponentId, instanceId: InstanceId) {
    return this.store.mutate((components) => {
      const component = components[componentId];
      if (!component) {
        throw new Error(`Component ${componentId} does not exist`);
      }
      delete component.instances[instanceId];
      const hasInstances = Object.keys(component.instances).length > 0;
      if (component.shouldBeRemovedWhenEmpty && !hasInstances) {
        this.removeComponents([componentId]);
      }
    });
  }

  spawnInstance<Props extends InstanceProps, Resolution>(
    componentId: ComponentId,
    instanceId: InstanceId,
    props: Props,
  ) {
    const resolveSpawnCall = deferPromise<Resolution>();

    this.store.mutate((state) => {
      const component = state[componentId];
      if (!component) {
        throw new Error(`Component ${componentId} does not exist`);
      }

      if (component.instances[instanceId]) {
        throw new Error(
          `Instance ${instanceId} of component ${componentId} already exists`,
        );
      }

      component.instances[instanceId] = {
        open: true,
        props,
        resolve: (value) => {
          this.store.mutate((components) => {
            const instance = components[componentId].instances[instanceId];
            instance.open = false;
            const removeDelay = this.removeDelays.get(instanceId);
            if (removeDelay) {
              removeDelay.then(() =>
                this.removeInstance(componentId, instanceId),
              );
            } else {
              this.removeInstance(componentId, instanceId);
            }
          });
          resolveSpawnCall(value as Resolution);
        },
      };
    });

    return resolveSpawnCall.promise;
  }

  private _idCounter = 0;

  nextId<T extends string>() {
    return (this._idCounter++).toString() as T;
  }
}

export type ModalStoreState = Record<ComponentId, ComponentEntry>;

export interface ModalProps<ResolutionValue = void>
  extends ResolvingComponentProps<ResolutionValue>,
    UseSpawnSustainerProps {
  open: boolean;
}

export interface ResolvingComponentProps<ResolutionValue> {
  resolve: (value: ResolutionValue) => void;
}

export type ComponentId = string;

export type UpsertComponentPayload = Pick<
  ComponentEntry,
  "component" | "defaultProps"
>;

export interface ComponentEntry {
  component: ComponentType<ModalProps<unknown>>;
  defaultProps?: Record<string, unknown>;
  instances: Record<InstanceId, InstanceEntry>;
  shouldBeRemovedWhenEmpty?: boolean;
}

export type InstanceId = string;

export interface InstanceEntry
  extends Omit<ModalProps<unknown>, keyof UseSpawnSustainerProps> {
  props: InstanceProps;
}

export type InstanceProps<
  ResolutionValue = unknown,
  AdditionalComponentProps = {},
  DefaultProps extends Partial<AdditionalComponentProps> = {},
> = Omit<
  PartialByKeys<
    ModalProps<ResolutionValue> & AdditionalComponentProps,
    keyof DefaultProps
  >,
  keyof ModalProps<unknown>
>;
