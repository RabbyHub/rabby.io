const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const source = path.resolve(__dirname, "../src/service/openapiStore.ts");
const compiled = ts.transpileModule(fs.readFileSync(source, "utf8"), {
  compilerOptions: {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
  },
}).outputText;
const STORAGE_KEY = "rabby:openapi";
const NOW = 1757404000123;

const createStorage = (initial = null) => {
  const values = new Map(initial === null ? [] : [[STORAGE_KEY, initial]]);
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
};

const loadStore = (window, now = NOW) => {
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    window,
    crypto: { randomUUID },
    Date: { now: () => now },
  });
  return exports.OpenapiStore;
};

const readSaved = (storage) => JSON.parse(storage.getItem(STORAGE_KEY));

test("generates and persists a UUID v4 and a timestamp in seconds", () => {
  const storage = createStorage();
  const OpenapiStore = loadStore({ localStorage: storage });
  const store = new OpenapiStore();
  assert.match(
    store.apiKey,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  );
  assert.equal(store.apiTime, Math.floor(NOW / 1000));
  assert.equal(store.host, "https://api.rabby.io");
  assert.deepEqual(readSaved(storage), {
    apiKey: store.apiKey,
    apiTime: store.apiTime,
  });
});

test("reuses the identity and original timestamp after a page reload", () => {
  const storage = createStorage();
  const FirstStore = loadStore({ localStorage: storage });
  const first = new FirstStore();
  const NextStore = loadStore({ localStorage: storage }, NOW + 86400000);
  const next = new NextStore();
  assert.equal(next.apiKey, first.apiKey);
  assert.equal(next.apiTime, first.apiTime);
});

test("persists SDK key rotation without changing apiTime or requiring UUID format", () => {
  const storage = createStorage();
  const OpenapiStore = loadStore({ localStorage: storage });
  const store = new OpenapiStore();
  const createdAt = store.apiTime;
  // OpenApiService.setAPIKey (including x-set-api-key responses) assigns this.
  store.apiKey = "server-issued-key";
  assert.deepEqual(readSaved(storage), {
    apiKey: "server-issued-key",
    apiTime: createdAt,
  });
  assert.equal(new OpenapiStore().apiKey, "server-issued-key");
  store.apiTime = createdAt + 1;
  assert.equal(new OpenapiStore().apiTime, createdAt + 1);
});

test("persists SDK identity removal and regenerates on the next initialization", () => {
  const storage = createStorage();
  const OpenapiStore = loadStore({ localStorage: storage });
  const store = new OpenapiStore();
  const previousKey = store.apiKey;
  store.apiKey = null;
  store.apiTime = null;
  assert.deepEqual(readSaved(storage), { apiKey: null, apiTime: null });
  assert.notEqual(new OpenapiStore().apiKey, previousKey);
});

for (const raw of [
  "invalid json",
  "null",
  "[]",
  "true",
  '"string"',
  "{}",
  '{"apiKey":null,"apiTime":null}',
  '{"apiKey":"","apiTime":1757404000}',
  '{"apiKey":"   ","apiTime":1757404000}',
  '{"apiKey":123,"apiTime":1757404000}',
  '{"apiKey":"old"}',
  '{"apiKey":"old","apiTime":null}',
  '{"apiKey":"old","apiTime":"1757404000"}',
  '{"apiKey":"old","apiTime":0}',
  '{"apiKey":"old","apiTime":-1}',
  '{"apiKey":"old","apiTime":1.5}',
]) {
  test(`replaces invalid or incomplete stored identity: ${raw}`, () => {
    const storage = createStorage(raw);
    const OpenapiStore = loadStore({ localStorage: storage });
    const store = new OpenapiStore();
    assert.notEqual(store.apiKey, "old");
    assert.equal(typeof store.apiKey, "string");
    assert.equal(store.apiTime, Math.floor(NOW / 1000));
    assert.equal(readSaved(storage).apiKey, store.apiKey);
  });
}

test("does not restore the API host or unrelated data from localStorage", () => {
  const storage = createStorage(
    JSON.stringify({
      apiKey: "existing-key",
      apiTime: 1757404000,
      host: "https://example.invalid",
      unrelated: "value",
    })
  );
  const OpenapiStore = loadStore({ localStorage: storage });
  const store = new OpenapiStore();
  assert.equal(store.host, "https://api.rabby.io");
  store.apiKey = "rotated-key";
  assert.deepEqual(readSaved(storage), {
    apiKey: "rotated-key",
    apiTime: 1757404000,
  });
});

test("keeps an in-memory identity when access to localStorage is blocked", () => {
  const OpenapiStore = loadStore({
    get localStorage() {
      throw new Error("Storage blocked");
    },
  });
  const store = new OpenapiStore();
  assert.equal(typeof store.apiKey, "string");
  assert.equal(store.apiTime, Math.floor(NOW / 1000));
  store.apiKey = "rotated-key";
  assert.equal(store.apiKey, "rotated-key");
});

test("keeps updates in memory when storage writes fail", () => {
  const storage = createStorage(
    JSON.stringify({ apiKey: "existing-key", apiTime: 1757404000 })
  );
  storage.setItem = () => {
    throw new Error("Quota exceeded");
  };
  const OpenapiStore = loadStore({ localStorage: storage });
  const store = new OpenapiStore();
  assert.equal(store.apiKey, "existing-key");
  store.apiKey = "rotated-key";
  store.apiTime = 1757405000;
  assert.equal(store.apiKey, "rotated-key");
  assert.equal(store.apiTime, 1757405000);
});
