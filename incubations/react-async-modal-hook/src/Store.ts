export class Store<State> {
  private _listeners = new Set<StoreListener<State>>();
  private _currentMutation?: { draft: State };

  get state(): State {
    return this._state;
  }

  constructor(private _state: State) {}

  mutate(mutator: (state: State) => void): void {
    if (this._currentMutation) {
      mutator(this._currentMutation.draft);
      return;
    }

    // We actually don't need to clone the state here, but we do it to
    // ensure that each mutation makes the state become a new object reference.
    // This makes integrating with React.useSyncExternalStore way possible.
    const draft = { ...this._state };

    this._currentMutation = { draft };

    try {
      mutator(draft);
    } finally {
      this._currentMutation = undefined;
    }

    this._state = draft;
    for (const listener of this._listeners) {
      listener(this._state);
    }
  }

  subscribe = (listener: StoreListener<State>): StoreUnsubscriber => {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  };
}

export type StoreUnsubscriber = () => void;

export type StoreListener<State> = (state: State) => void;
