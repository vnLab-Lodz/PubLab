import fs from 'fs';
import http from 'isomorphic-git/http/node';
import * as git from 'isomorphic-git';
import { LocalPublication } from '../../shared/types';
import { createLogger } from '../logger';
import { GitRepoTreeItem } from '../../shared/types/api';
import { absoluteToGitPath } from '../../shared/utils/paths';
import { MAIN_BRANCH } from '../../shared/constants';

const createGitRepoHandler = (publication: LocalPublication) => {
  const logger = createLogger();

  if (!publication.dirPath) {
    const msg = 'No active publication or directory path is undefined';
    logger.appendError(msg);
    throw new Error(msg);
  }

  return {
    commit: async ({
      message,
      authorUsername,
    }: {
      message: string;
      authorUsername: string;
    }) => {
      await git.commit({
        fs,
        dir: publication.dirPath,
        message,
        author: { name: authorUsername },
      });
    },

    push: async ({
      authToken,
      remoteRef,
      onAuthFailure,
    }: {
      authToken: string;
      remoteRef?: string;
      onAuthFailure?: git.AuthFailureCallback;
    }) => {
      await git.push({
        fs,
        http,
        dir: publication.dirPath,
        remoteRef,
        onAuth: () => ({ username: authToken }), // https://isomorphic-git.org/docs/en/onAuth
        onAuthFailure,
      });
    },

    stage: async (items: GitRepoTreeItem[]) => {
      await Promise.all(
        items.map(async (item) => {
          const filepath = absoluteToGitPath(
            item.filepath,
            publication.dirPath
          );
          await git.updateIndex({
            fs,
            dir: publication.dirPath,
            filepath,
            add: true,
            remove: !item.status.workdir,
          });
        })
      );
    },

    unstage: async (items: GitRepoTreeItem[]) => {
      await Promise.all(
        items.map(async (item) => {
          const filepath = absoluteToGitPath(
            item.filepath,
            publication.dirPath
          );
          await git.resetIndex({
            fs,
            dir: publication.dirPath,
            filepath,
          });
        })
      );
    },

    checkout: async (branch: string) => {
      try {
        const currentBranch = await git.currentBranch({
          fs,
          dir: publication.dirPath,
        });

        if (currentBranch === branch) return;

        await git.checkout({
          fs,
          dir: publication.dirPath,
          ref: branch,
        });
      } catch (e) {
        if ((e as any).code === 'NotFoundError') {
          logger.appendLog(`${(e as Error).message} 'Creating new branch.`);
          await git.checkout({
            fs,
            dir: publication.dirPath,
            ref: MAIN_BRANCH,
          });
          await git.branch({
            fs,
            dir: publication.dirPath,
            ref: branch,
            checkout: true,
          });
        }
      }
    },
  };
};

export default createGitRepoHandler;
