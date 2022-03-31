import { IpcMainInvokeEvent } from 'electron';

export type IpcEventHandler<R = any> = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<R>;

export const CHANNELS = {
  PUBLICATIONS: {
    GENERATE: 'publications:generate',
    FIND: 'publications:find',
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
  },
  FILES: {
    VERIFY_PATH: 'files:verify-path',
  },
} as const;
