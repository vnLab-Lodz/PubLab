import * as fs from 'fs';

const logger = fs.createWriteStream('pub-lab.log', { flags: 'a' });
const tzOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds

export function appendLog(msg: string): void {
  const localISOTime = new Date(Date.now() - tzOffset).toISOString();
  logger.write(
    `${localISOTime.replace(/T/, ' ').replace(/\..+/, '')} ${msg}\n`
  );
}
