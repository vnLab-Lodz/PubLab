import { IpcMainInvokeEvent } from 'electron';

export type IpcEventHandler<R = any> = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<R>;

export const CHANNELS = {
  PUBLICATIONS: {
    GENERATE: 'publications:generate',
  },
} as const;
