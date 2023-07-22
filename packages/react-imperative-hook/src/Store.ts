import type { Draft } from "immer";
import { produce } from "immer";

export class Store<State> {
  private _listeners = new Set<StoreListener<State>>();
  private _currentMutation?: { draft: Draft<State> };

  get state(): State {
    return this._state;
  }

  constructor(private _state: State) {}

  mutate(mutator: (state: State) => void): void {
    if (this._currentMutation) {
      mutator(this._currentMutation.draft as State);
      return;
    }

    const newState = produce(this._state, (draft) => {
      this._currentMutation = { draft };
      mutator(draft as State);
      this._currentMutation = undefined;
    });

    this._state = newState;
    for (const listener of this._listeners) {
      listener(newState);
    }
  }

  subscribe = (listener: StoreListener<State>): StoreUnsubscriber => {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  };
}

export type StoreUnsubscriber = () => void;

export type StoreListener<State> = (state: State) => void;
