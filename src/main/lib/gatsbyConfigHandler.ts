import util from 'util';
import path from 'path';
import fs from 'fs';
import { createLogger } from '../logger';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export interface GatsbyConfigHandler {
  getConfig: () => Promise<string>;
  setConfig: (config: string) => Promise<void>;
  modifyConfig: (modifier: (config: string) => string) => Promise<void>;
}

const createGatsbyConfigHandler = (options: {
  dirPath: string;
  name: string;
  usesTypescript: boolean;
}): GatsbyConfigHandler => {
  const logger = createLogger();
  const { dirPath, name, usesTypescript } = options;
  const fileExtension = usesTypescript ? 'ts' : 'js';
  const gatsbyConfig = `gatsby-config.${fileExtension}`;
  const prefix = usesTypescript ? ['config'] : [];
  const gatsbyConfigPath = path.join(dirPath, name, ...prefix, gatsbyConfig);

  return {
    async getConfig() {
      try {
        logger.appendLog(`Reading ${gatsbyConfig}...`);
        const data = await readFile(gatsbyConfigPath, 'utf-8');
        logger.appendLog(`Reading ${gatsbyConfig} successful.`);
        return data;
      } catch (error) {
        logger.appendError(`Reading ${gatsbyConfig} failed.`);
        logger.appendError(`${error}`);
        throw new Error('Placeholder for gatsby config open error');
      }
    },
    async setConfig(config) {
      try {
        logger.appendLog(`Writing ${gatsbyConfig}...`);
        await writeFile(gatsbyConfigPath, config, 'utf-8');
        logger.appendLog(`Writing ${gatsbyConfig} successful.`);
      } catch (error) {
        logger.appendError(`Writing ${gatsbyConfig} failed.`);
        logger.appendError(`${error}`);
        throw new Error('Placeholder for gatsby config write error');
      }
    },
    async modifyConfig(modifier) {
      try {
        const data = await this.getConfig();
        logger.appendLog(`Modifying ${gatsbyConfig}...`);
        await this.setConfig(modifier(data));
        logger.appendLog(`Modifying ${gatsbyConfig} successful.`);
      } catch (error: any) {
        logger.appendError(`Modifying ${gatsbyConfig} failed.`);
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
  };
};

export default createGatsbyConfigHandler;
