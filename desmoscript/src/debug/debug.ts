export let DESMO_DEBUG = false;
export function enableDebug() {
  DESMO_DEBUG = true;
}

export function debugPrint(...args: any[]) {
  if (DESMO_DEBUG) console.log(...args);
}

export function debugTrace() {
  if (DESMO_DEBUG) console.trace();
}
