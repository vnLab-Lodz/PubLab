import { existsSync, readFileSync, writeFileSync } from 'fs';

export function writeJSON(path: string, content: any) {
  const JSONContent = JSON.stringify(content, null, 2);
  writeFileSync(path, JSONContent);
}

export function readJSON(path: string): any {
  if (existsSync(path)) {
    const JSONContent = readFileSync(path).toString();
    return JSON.parse(JSONContent);
  }
  return null;
}
