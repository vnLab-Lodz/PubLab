import { IpcMainInvokeEvent, IpcRendererEvent } from 'electron';
import { Stat } from 'isomorphic-git';

export type IpcEventHandler<R = any> = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<R>;

export type IpcRendererEventHandler<R = any> = (
  event: IpcRendererEvent,
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

export interface BranchComparison {
  isAhead: boolean;
  isBehind: boolean;
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
    READ_ASSET: 'files:read-asset',
    OPEN_DEFAULT: 'files:open-in-default-app',
    COPY: 'files:copy',
    REMOVE: 'files:remove',
  },
  GIT: {
    CLONE: 'git:clone',
    PUSH: 'git:push',
    PULL: 'git:pull',
    REPO_STATUS: 'git:repo-status',
    FILES_STATUS: 'git:files-status',
    STAGE: 'git:stage',
    COMMIT: 'git:commit',
    CHECKOUT: 'git:checkout',
  },
  GITHUB: {
    GET_USER_PUBLIC: 'github:get-user-public',
    UPDATE_COLLABORATORS: 'github:update-collaborators',
    COMPARE_BRANCHES: 'github:compare-branches',
  },
  SERVER: {
    INSTALL: 'server:install',
    START: 'server:start',
    CLEAR_CACHE: 'server:clear-cache',
    STOP: 'server:stop',
    WRITE: 'server:write',
  },
} as const;
