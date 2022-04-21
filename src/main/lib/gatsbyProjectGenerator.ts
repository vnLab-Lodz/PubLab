import { PublicationBase } from 'src/shared/types';
import child_process from 'child_process';
import util from 'util';
import { createLogger } from '../logger';

const exec = util.promisify(child_process.exec);

export enum TEMPLATE_URLS {
  PAAW_I18N = 'https://github.com/vnLab-Lodz/gatsby-starter-paaw-i18n',
  PAAW_BASIC = 'https://github.com/vnLab-Lodz/gatsby-starter-paaw-basic',
}

export interface GatsbyProjectGenerator {
  getTemplateUrl(): string;
  generate(cwd: string, repoName?: string): Promise<void>;
}

const createGatsbyProjectGenerator = (
  publication: PublicationBase
): GatsbyProjectGenerator => ({
  getTemplateUrl() {
    const { useSass, useTypescript } = publication;

    return useSass && useTypescript
      ? TEMPLATE_URLS.PAAW_I18N
      : TEMPLATE_URLS.PAAW_BASIC;
  },
  async generate(cwd, repoName = publication.name) {
    const logger = createLogger();
    const templateUrl = this.getTemplateUrl();

    try {
      logger.appendLog('Generating new project...');
      const command = `gatsby new ${repoName} ${templateUrl}`;
      const { stdout, stderr } = await exec(command, { cwd });
      logger.appendLog(`Project generation standard output: ${stdout}`);
      logger.appendLog(`Project generation error output: ${stderr}`);
      logger.appendLog('Finished generation of the new project');
    } catch (error) {
      logger.appendError(`Project generation error output: ${error}`);
      throw new Error('Placeholder for project generation error');
    }
  },
});

export default createGatsbyProjectGenerator;
