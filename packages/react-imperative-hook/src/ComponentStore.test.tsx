import { ComponentStore } from "./ComponentStore";
import { deferPromise } from "./deferPromise";

describe("ComponentStore", () => {
  let store: ComponentStore;

  beforeEach(() => {
    store = new ComponentStore();
  });

  it("should initialize with empty state", () => {
    expect(store.state).toEqual({});
  });

  it("should insert a component if it doesn't already exist", () => {
    const entry = { component: jest.fn(), defaultProps: {} };

    store.upsertComponent("1", entry);

    expect(store.state["1"]).toEqual(expect.objectContaining(entry));
  });

  it("should update a component if it already exists", () => {
    const initialEntry = { component: jest.fn(), defaultProps: { foo: "bar" } };
    const updatedEntry = { component: jest.fn(), defaultProps: { baz: "qux" } };

    store.upsertComponent("1", initialEntry);
    store.upsertComponent("1", updatedEntry);

    expect(store.state["1"]).toEqual(expect.objectContaining(updatedEntry));
  });

  it("removes the correct instance", () => {
    store.upsertComponent("a", { component: jest.fn() });
    store.spawnInstance("a", "1", {});
    store.spawnInstance("a", "2", {});
    store.removeInstance("a", "1");

    expect(store.state["a"].instances["1"]).toBeUndefined();
    expect(store.state["a"].instances["2"]).toBeDefined();
  });

  it("retains an unmarked component after removing its last instance", () => {
    store.upsertComponent("a", { component: jest.fn() });
    store.spawnInstance("a", "1", {});
    store.removeInstance("a", "1");

    expect(store.state["a"]).toBeDefined();
  });

  it("removes a marked component after removing its last instance", () => {
    store.upsertComponent("a", { component: jest.fn() });
    store.markComponentForRemoval("a");
    store.spawnInstance("a", "1", {});
    store.removeInstance("a", "1");

    expect(store.state["a"]).toBeUndefined();
  });

  it("retains a marked component when removing only one of its two instances", () => {
    store.upsertComponent("a", { component: jest.fn() });
    store.spawnInstance("a", "1", {});
    store.spawnInstance("a", "2", {});
    store.removeInstance("a", "1");

    expect(store.state["a"]).toBeDefined();
  });

  it("throws error if trying to spawn an instance of a non-existent component", () => {
    expect(() => store.spawnInstance("a", "1", {})).toThrow();
  });

  it("throws error if trying to remove an instance of a non-existent component", () => {
    expect(() => store.removeInstance("a", "1")).toThrow();
  });

  describe("can resolve instance", () => {
    it("immediately", () => {
      store.upsertComponent("a", { component: jest.fn() });
      void store.spawnInstance("a", "1", {});
      store.state["a"].instances["1"].resolve(undefined);
      expect(store.state["a"].instances["1"]).toBeUndefined();
    });

    it("delayed", async () => {
      store.upsertComponent("a", { component: jest.fn() });
      void store.spawnInstance("a", "1", {});
      const delay = deferPromise();
      store.state["a"].instances["1"].resolve(undefined, delay.promise);
      expect(store.state["a"].instances["1"]).toBeDefined();
      delay.resolve();
      await delay.promise;
      expect(store.state["a"].instances["1"]).toBeUndefined();
    });

    it("with value", async () => {
      const resolution = { foo: 123 };
      store.upsertComponent("a", { component: jest.fn() });
      const promise = store.spawnInstance("a", "1", {});
      store.state["a"].instances["1"].resolve(resolution);
      await expect(promise).resolves.toBe(resolution);
    });
  });
});
