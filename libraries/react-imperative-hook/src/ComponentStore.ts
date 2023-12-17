import type { ComponentType } from "react";
import type { MakeOptionalIfEmptyObject, PartialByKeys } from "./utilityTypes";
import { deferPromise } from "./deferPromise";
import type { UseSpawnSustainerProps } from "./createSpawnSustainerHook";
import { Store } from "./Store";

export class ComponentStore {
  // Remove delays are not part of the observable Store since they have no reactive impact.
  // They are pulled from the map when instances resolve.
  private removeDelays = new Map<InstanceId, Promise<void>>();

  constructor(private store = new Store<ComponentStoreState>({})) {
    this.subscribe = this.store.subscribe.bind(this.store);
  }

  get state() {
    return this.store.state;
  }

  subscribe: Store<ComponentStoreState>["subscribe"];

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
        state: { type: "pending" },
        props,
        resolve: (value) => {
          this.store.mutate((components) => {
            const instance = components[componentId].instances[instanceId];
            instance.state = { type: "resolved", value };
            const removeDelay = this.removeDelays.get(instanceId);
            if (removeDelay) {
              removeDelay.then(() =>
                this.removeInstance(componentId, instanceId),
              );
            } else {
              this.removeInstance(componentId, instanceId);
            }
          });
          resolveSpawnCall(value);
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

export type ComponentStoreState = Record<ComponentId, ComponentEntry>;

export interface ImperativeComponentProps<ResolutionValue = any>
  extends ResolvingComponentProps<ResolutionValue>,
    UseSpawnSustainerProps {
  state: InstanceState<ResolutionValue>;
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
  component: ComponentType<ImperativeComponentProps>;
  defaultProps?: Record<string, unknown>;
  instances: Record<InstanceId, InstanceEntry>;
  shouldBeRemovedWhenEmpty?: boolean;
}

export type InstanceId = string;

export interface InstanceEntry
  extends Omit<ImperativeComponentProps, keyof UseSpawnSustainerProps> {
  props: InstanceProps;
}

export type InstanceState<ResolutionValue = unknown> =
  | { type: "pending" }
  | { type: "resolved"; value: ResolutionValue };

export type InstanceProps<
  ResolutionValue = unknown,
  AdditionalComponentProps = {},
  DefaultProps extends Partial<AdditionalComponentProps> = {},
> = MakeOptionalIfEmptyObject<
  Omit<
    PartialByKeys<
      ImperativeComponentProps<ResolutionValue> & AdditionalComponentProps,
      keyof DefaultProps
    >,
    keyof ImperativeComponentProps
  >
>;
