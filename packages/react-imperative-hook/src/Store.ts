export class Store<State> {
  private _listeners = new Set<StoreListener<State>>();
  private _isMutating = false;
  get state(): State {
    return this._state;
  }

  constructor(private _state: State) {}

  mutate(mutator: (state: State) => void): void {
    if (this._isMutating) {
      mutator(this._state);
      return;
    }

    this._isMutating = true;
    mutator(this._state);
    this._isMutating = false;

    for (const listener of this._listeners) {
      listener(this._state);
    }
  }

  subscribe(listener: StoreListener<State>): StoreUnsubscriber {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
}

export type StoreUnsubscriber = () => void;

export type StoreListener<State> = (state: State) => void;
