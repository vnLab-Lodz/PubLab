import { lte } from 'semver';
import app from './app';

export interface VersionDetails {
  version: string;
  isUpToDate: boolean;
}

export function getVersionDetails() {
  const version = app.getVersion();
  const latestVersion = fetchLatestVersion();
  return { version, isUpToDate: isUpToDate(latestVersion, version) };
}

function isUpToDate(latestVersion: string, currentVersion: string) {
  return lte(latestVersion, currentVersion);
}

function fetchLatestVersion() {
  // TODO: Implement fetching actual version number
  return '1.0.1';
}
