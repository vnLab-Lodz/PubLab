import { IpcMainInvokeEvent } from 'electron';
import { Stat } from 'isomorphic-git';

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

export interface GitFileStatus {
  head: 0 | 1;
  workdir: 0 | 1 | 2;
  stage: 0 | 1 | 2 | 3;
}

export interface GitRepoTreeItem {
  filepath: string;
  status: GitFileStatus;
  stats?: Stat;
  isDirectory?: boolean;
  children: GitRepoTreeItem[];
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
    REPO_STATUS: 'git:repo-status',
    STAGE: 'git:stage',
  },
} as const;
