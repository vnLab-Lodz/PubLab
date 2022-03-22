import { IpcMainInvokeEvent } from 'electron';

export type IpcEventHandler<R = any> = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<R>;

export const CHANNELS = {
  PUBLICATIONS: {
    GENERATE: 'publications:generate',
  },
  GATSBY: {
    VERIFY: 'gatsby:verify',
    INSTALL: 'gatsby:install',
  },
  NODE: {
    VERIFY: 'node:verify',
  },
} as const;
