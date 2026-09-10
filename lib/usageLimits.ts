export const FREE_MONTHLY_LIMIT = 5;

function monthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

function storageKey(featureId: string) {
  return `saito-wotchi:usage:${featureId}:${monthKey()}`;
}

export function getUsage(featureId: string): number {
  try {
    const raw = window.localStorage.getItem(storageKey(featureId));
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementUsage(featureId: string): number {
  const next = getUsage(featureId) + 1;
  try {
    window.localStorage.setItem(storageKey(featureId), String(next));
  } catch {}
  return next;
}
