import { app } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Settings } from '../../shared/redux/slices/settingsSlice';

const settingsFileName = 'publab-settings.json';
const path = app.getPath('userData');

export function writeSettingsFile(settings: Settings) {
  const settingJSON = JSON.stringify(settings, null, 2);
  writeFileSync(`${path}/${settingsFileName}`, settingJSON);
}

export function readSettingsFile(): Settings | null {
  const fullPath = `${path}/${settingsFileName}`;
  if (existsSync(fullPath)) {
    const settingsJSON = readFileSync(`${path}/${settingsFileName}`).toString();
    return JSON.parse(settingsJSON);
  }
  return null;
}
