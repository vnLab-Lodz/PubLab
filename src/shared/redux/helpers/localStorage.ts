export function getLocalStorageItem<T = string>(
  key: string,
  transform?: (arg: string) => T
): T | string | undefined {
  try {
    const item = localStorage.getItem(key);
    if (item == null) return undefined;

    return transform ? transform(item) : item;
  } catch {
    return undefined;
  }
}

export function setLocalStorageItem<T = string>(key: string, value: T) {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error(error);
  }
}
