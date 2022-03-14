import { promises as fsp } from 'fs';

export default async function verifyPath(path: string) {
  try {
    await fsp.access(path);
    return true;
  } catch (error) {
    return false;
  }
}
