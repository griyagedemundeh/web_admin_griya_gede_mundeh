class LocalStorage {
  static set(key: string, data: unknown): void {
    localStorage.setItem(key, safeStringify(data));
  }

  static get<T>(key: string): T | unknown {
    if (localStorage) {
      const dataRaw = localStorage.getItem(key);

      if (dataRaw) {
        const data: T = JSON.parse(dataRaw ?? "");

        return data;
      }
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static removeAll(): void {
    localStorage.clear();
  }
}

function safeStringify(obj: unknown): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return; // Duplicate reference found, discard key
      }
      seen.add(value);
    }
    return value;
  });
}

export default LocalStorage;
