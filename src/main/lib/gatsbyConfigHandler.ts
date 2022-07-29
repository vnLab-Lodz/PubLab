import path from 'path';
import { createLogger } from '../logger';
import createFileIO from './fileIO';

export interface GatsbyConfigHandler {
  getConfig: () => Promise<string>;
  setConfig: (config: string) => Promise<void>;
  modifyConfig: (modifier: (config: string) => string) => Promise<void>;
  getPath: () => string;
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
  const io = createFileIO();

  return {
    async getConfig() {
      try {
        logger.appendLog(`Reading ${gatsbyConfig}...`);
        const data = await io.readString(gatsbyConfigPath);
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
        await io.writeString(gatsbyConfigPath, config);
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
    getPath() {
      return gatsbyConfigPath;
    },
  };
};

export default createGatsbyConfigHandler;
