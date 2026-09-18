const STORAGE_KEY = "rabby:openapi";

type ApiIdentity = {
  apiKey: string | null;
  apiTime: number | null;
};

const readIdentity = (): ApiIdentity | null => {
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "null"
    );
    if (
      typeof saved?.apiKey === "string" &&
      saved.apiKey.trim() &&
      Number.isSafeInteger(saved.apiTime) &&
      saved.apiTime > 0
    ) {
      return { apiKey: saved.apiKey, apiTime: saved.apiTime };
    }
  } catch {
    // Invalid JSON or unavailable storage: create an identity for this page.
  }
  return null;
};

export class OpenapiStore {
  host = "https://api.rabby.io";
  private identity: ApiIdentity;

  constructor() {
    const saved = readIdentity();
    this.identity = saved ?? {
      apiKey: crypto.randomUUID(),
      apiTime: Math.floor(Date.now() / 1000),
    };
    if (!saved) this.persist();
  }

  private persist() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.identity));
    } catch {
      // Keep using the in-memory identity if browser storage is unavailable.
    }
  }

  get apiKey() {
    return this.identity.apiKey;
  }

  set apiKey(value: string | null) {
    this.identity.apiKey = value;
    this.persist();
  }

  get apiTime() {
    return this.identity.apiTime;
  }

  set apiTime(value: number | null) {
    this.identity.apiTime = value;
    this.persist();
  }
}
