const TAG_PREFIX = '#';

export function hasTagPrefix(string: string) {
  return string.startsWith(TAG_PREFIX);
}

export function addPrefix(tagName: string) {
  return TAG_PREFIX.concat(tagName);
}

export function removePrefix(tagWithPrefix: string) {
  return tagWithPrefix.slice(TAG_PREFIX.length);
}
