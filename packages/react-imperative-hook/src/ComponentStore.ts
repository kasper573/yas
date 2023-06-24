import { Store } from "./Store";
import type {
  AnyComponent,
  MakeOptionalIfEmptyObject,
  PartialByKeys,
} from "./utilityTypes";

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

  markComponentForRemoval(id: ComponentId) {
    return this.store.mutate((components) => {
      components[id].markedForRemoval = true;
    });
  }

  removeInstance(componentId: ComponentId, instanceId: InstanceId) {
    return this.store.mutate((components) => {
      const component = components[componentId];
      delete component.instances[instanceId];
      if (
        component.markedForRemoval &&
        !Object.keys(component.instances).length
      ) {
        delete components[componentId];
      }
    });
  }

  spawnInstance<Props extends InstanceProps, Resolution>(
    componentId: ComponentId,
    instanceId: InstanceId,
    props: Props
  ) {
    return new Promise<Resolution>((resolve) => {
      this.store.mutate((state) => {
        state[componentId].instances[instanceId] = {
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
            resolve(value);
          },
        };
      });
    });
  }
}

export type ImperativeInterfaceFor<
  ResolutionValue,
  AdditionalComponentProps,
  DefaultProps extends Partial<AdditionalComponentProps>
> = (
  props: InstanceProps<ResolutionValue, AdditionalComponentProps, DefaultProps>
) => Promise<ResolutionValue>;

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
  markedForRemoval?: boolean;
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
