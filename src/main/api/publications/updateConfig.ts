/* eslint-disable no-param-reassign */
import path from 'path';
import { IpcEventHandler } from 'src/shared/types/api';
import createConfigFileHandler, {
  Config,
} from '../../lib/configurationFileHandler';
import createGatsbyConfigHandler from '../../lib/gatsbyConfigHandler';
import createPackageHandler from '../../lib/packageHandler';

const updateConfig: IpcEventHandler = async (
  _,
  dirPath: string,
  changes: Partial<Config>
) => {
  const configHandler = createConfigFileHandler({ dirPath });
  const oldConfig = await configHandler.getConfig();
  await configHandler.setConfig({ ...oldConfig, ...changes });

  if (changes.name || changes.description) {
    const options = {
      name: path.basename(dirPath),
      dirPath: path.dirname(dirPath),
      usesTypescript: oldConfig.useTypescript,
    };
    const gatsbyConfigHandler = createGatsbyConfigHandler(options);
    await gatsbyConfigHandler.modifyConfig((originalData) => {
      let data = originalData;
      if (changes.name)
        data = data.replace(/title: `(.*?)`,/g, `title: \`${changes.name}\`,`);
      if (changes.description)
        data = data.replace(
          /description: `.*?`,/g,
          `description: \`${changes.description}\`,`
        );
      return data;
    });

    const packageHandler = createPackageHandler(options);
    await packageHandler.modifyPackage((packageJSON) => {
      if (changes.name)
        packageJSON.name = changes.name.toLowerCase().replaceAll(' ', '-');
      if (changes.description) packageJSON.description = changes.description;
    });
  }
};

export default updateConfig;
