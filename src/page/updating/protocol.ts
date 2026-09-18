export const UPDATE_CHANNEL = "rabby-updating-v1";

export function isVersion(value: unknown): value is string {
  return typeof value === "string" && /^\d+(?:\.\d+){2,3}$/.test(value);
}

export function isAtLeastVersion(installed: string, target: string) {
  const a = installed.split(".").map(Number);
  const b = target.split(".").map(Number);
  for (let i = 0; i < 4; i++) {
    if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
  }
  return true;
}
