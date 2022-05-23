import { IpcMainInvokeEvent } from 'electron';

export type IpcEventHandler<R = any> = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<R>;

export interface DirectoryEntryInfo {
  name: string;
  details?: { dateModifiedMs: number };
  directory: {
    isDirectory: boolean;
    content: DirectoryEntryInfo[] | undefined;
  };
}

export const CHANNELS = {
  PUBLICATIONS: {
    GENERATE: 'publications:generate',
    FIND_LOCAL: 'publications:find-local',
    FIND_REMOTE: 'publications:find-remote',
    UPDATE_CONFIG: 'publications:update-config',
  },
  GATSBY: {
    VERIFY: 'gatsby:verify',
    INSTALL: 'gatsby:install',
  },
  NODE: {
    VERIFY: 'node:verify',
  },
  SETTINGS: {
    SAVE: 'settings:save',
    READ: 'settings:read',
    READ_SYNC_LOCATIONS: 'settings:read-sync-locations',
  },
  FILES: {
    VERIFY_PATH: 'files:verify-path',
    READ_DIRECTORY: 'files:read-directory',
    OPEN_DEFAULT: 'files:open-in-default-app',
  },
  GIT: {
    CLONE: 'git:clone',
  },
} as const;
