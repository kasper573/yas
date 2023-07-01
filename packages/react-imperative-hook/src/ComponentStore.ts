import { Store } from "./Store";
import type {
  AnyComponent,
  MakeOptionalIfEmptyObject,
  PartialByKeys,
} from "./utilityTypes";
import { deferPromise } from "./deferPromise";

export class ComponentStore {
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

  removeInstance(componentId: ComponentId, instanceId: InstanceId) {
    return this.store.mutate((components) => {
      const component = components[componentId];
      if (!component) {
        throw new Error(`Component ${componentId} does not exist`);
      }
      delete component.instances[instanceId];
      if (!Object.keys(component.instances).length) {
        delete components[componentId];
      }
    });
  }

  spawnInstance<Props extends InstanceProps, Resolution>(
    componentId: ComponentId,
    instanceId: InstanceId,
    props: Props
  ) {
    const instanceCompletion = deferPromise<Resolution>();

    this.store.mutate((state) => {
      const component = state[componentId];
      if (!component) {
        throw new Error(`Component ${componentId} does not exist`);
      }

      if (component.instances[instanceId]) {
        throw new Error(
          `Instance ${instanceId} of component ${componentId} already exists`
        );
      }

      component.instances[instanceId] = {
        state: { type: "pending" },
        props,
        resolve: (value, removeDelay) => {
          this.store.mutate((components) => {
            components[componentId].instances[instanceId].state = {
              type: "resolved",
              value,
            };
            if (removeDelay) {
              removeDelay.then(() =>
                this.removeInstance(componentId, instanceId)
              );
            } else {
              this.removeInstance(componentId, instanceId);
            }
          });
          instanceCompletion.resolve(value);
        },
      };
    });

    return instanceCompletion.promise;
  }
}

export type ComponentStoreState = Record<ComponentId, ComponentEntry>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ImperativeComponentProps<ResolutionValue = any>
  extends ResolvingComponentProps<ResolutionValue> {
  state: InstanceState<ResolutionValue>;
}

export interface ResolvingComponentProps<ResolutionValue> {
  resolve: (value: ResolutionValue, removeDelay?: Promise<unknown>) => void;
}

export type ComponentId = string;

export type UpsertComponentPayload = Pick<
  ComponentEntry,
  "component" | "defaultProps"
>;

export interface ComponentEntry {
  component: AnyComponent;
  defaultProps?: Record<string, unknown>;
  instances: Record<InstanceId, InstanceEntry>;
}

export type InstanceId = string;

export interface InstanceEntry extends ImperativeComponentProps {
  props: InstanceProps;
}

export type InstanceState<ResolutionValue = unknown> =
  | { type: "pending" }
  | { type: "resolved"; value: ResolutionValue };

export type InstanceProps<
  ResolutionValue = unknown,
  // eslint-disable-next-line @typescript-eslint/ban-types
  AdditionalComponentProps = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  DefaultProps extends Partial<AdditionalComponentProps> = {}
> = MakeOptionalIfEmptyObject<
  Omit<
    PartialByKeys<
      ImperativeComponentProps<ResolutionValue> & AdditionalComponentProps,
      keyof DefaultProps
    >,
    keyof ImperativeComponentProps
  >
>;
