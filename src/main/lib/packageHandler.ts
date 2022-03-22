import util from 'util';
import path from 'path';
import fs from 'fs';
import { createLogger } from '../logger';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export const PACKAGE_NAME = 'package.json' as const;

export type PackageJSON = { [key: string]: string | boolean | number };

export interface PackageHandler {
  getPackage: () => Promise<PackageJSON>;
  setPackage: (packageData: PackageJSON) => Promise<void>;
  modifyPackage: (modifier: (pckg: PackageJSON) => void) => Promise<void>;
  modifyField: (
    field: string,
    value: string | boolean | number
  ) => Promise<void>;
}

const createPackageHandler = (options: {
  dirPath: string;
  name: string;
}): PackageHandler => {
  const logger = createLogger();
  const { dirPath, name } = options;
  const packagePath = path.join(dirPath, name, PACKAGE_NAME);

  return {
    async getPackage() {
      try {
        logger.appendLog('Reading package.json...');
        const packageData = await readFile(packagePath, 'utf-8');
        const data = JSON.parse(packageData);
        logger.appendLog('Reading package.json successful.');
        return data;
      } catch (error) {
        logger.appendError('Reading package.json failed.');
        logger.appendError(`${error}`);
        throw new Error('Placeholder for package open error');
      }
    },
    async setPackage(packageData) {
      try {
        logger.appendLog('Writing package.json...');
        await writeFile(packagePath, JSON.stringify(packageData, null, 2));
        logger.appendLog('Writing package.json successful.');
      } catch (error) {
        logger.appendError('Writing package.json failed.');
        logger.appendError(`${error}`);
        throw new Error('Placeholder for package write error');
      }
    },
    async modifyField(field, value) {
      try {
        const data = await this.getPackage();
        logger.appendLog(`Modifying ${field} in package.json...`);
        data[field] = value;
        logger.appendLog(`Modifying ${field} in package.json successful.`);
        await this.setPackage(data);
      } catch (error: any) {
        logger.appendError(`Modifying package.json ${field} failed.`);
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
    async modifyPackage(modifier) {
      try {
        const data = await this.getPackage();
        logger.appendLog(`Modifying package.json...`);
        modifier(data);
        logger.appendLog(`Modifying package.json successful.`);
        await this.setPackage(data);
      } catch (error: any) {
        logger.appendError('Modifying package.json failed.');
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
  };
};

export default createPackageHandler;
