import * as fs from 'fs';

const logger = fs
  .createWriteStream('pub-lab.log', { flags: 'a' })
  .addListener('error', console.error);
const tzOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds

export function appendLog(msg: string): void {
  const localISOTime = new Date(Date.now() - tzOffset).toISOString();
  logger.write(
    `${localISOTime.replace(/T/, ' ').replace(/\..+/, '')} ${msg}\n`
  );
}

export interface Logger {
  appendLog: (msg: string) => void;
  appendError: (msg: string) => void;
}

const developmentLogger: Logger = {
  appendLog(msg: string): void {
    console.log(msg);
  },
  appendError(msg: string): void {
    console.error(msg);
  },
};

const productionLogger: Logger = {
  appendLog(msg: string): void {
    appendLog(msg);
  },
  appendError(msg: string): void {
    appendLog(msg);
  },
};

export const createLogger = (): Logger =>
  process.env.NODE_ENV === 'development' ? developmentLogger : productionLogger;
