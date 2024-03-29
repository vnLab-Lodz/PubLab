import fs from 'fs';
import {
  isIgnored as ignored,
  STAGE,
  TREE,
  walk,
  WalkerEntry,
  WORKDIR,
} from 'isomorphic-git';
import { activePublication } from 'src/shared/redux/slices/loadPublicationsSlice';
import { mainStore as store } from 'src/main';
import {
  IpcEventHandler,
  GitFileStatus,
  GitRepoTreeItem,
} from '../../../shared/types/api';
import { createLogger } from '../../logger';
import { LocalPublication } from '../../../shared/types';
import {
  replaceNode,
  setStatusTree,
} from '../../../shared/redux/slices/repoStatusSlice';
import {
  absoluteToGitPath,
  gitPathToAbsolute,
} from '../../../shared/utils/paths';

// TODO: probably this also should be moved to src\main\lib\gitRepoHandler.ts

export const updateRepoStatus: IpcEventHandler = async () => {
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  if (!publication?.dirPath) {
    logger.appendError('No active publication or directory path is undefined');
    return;
  }

  const result = await walk({
    fs,
    dir: publication.dirPath,
    trees: [TREE({ ref: 'HEAD' }), WORKDIR(), STAGE()],
    async map(
      filepath,
      [head, workdir, stage]
    ): Promise<Omit<GitRepoTreeItem, 'children'> | null> {
      if (!head && !stage && workdir) {
        const isIgnored = await ignored({
          fs,
          dir: publication.dirPath,
          filepath,
        });
        if (isIgnored) {
          return null;
        }
      }

      const details = await getDetails({ head, workdir, stage });
      return {
        filepath: gitPathToAbsolute(filepath, publication.dirPath),
        ...details,
      };
    },
    async reduce(parent, children) {
      return Object.assign(parent, { children });
    },
  });
  store.dispatch(setStatusTree(result));
};

export const updateFilesStatus: IpcEventHandler = async (
  _,
  absolutePaths: string[]
) => {
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  if (!publication?.dirPath) {
    logger.appendError('No active publication or directory path is undefined');
    return;
  }

  const relativePaths = absolutePaths.map((path) =>
    absoluteToGitPath(path, publication.dirPath)
  );

  const result = (await walk({
    fs,
    dir: publication.dirPath,
    trees: [TREE({ ref: 'HEAD' }), WORKDIR(), STAGE()],
    async map(
      filepath,
      [head, workdir, stage]
    ): Promise<Omit<GitRepoTreeItem, 'children'> | null | undefined> {
      if (
        relativePaths.some(
          (path) => path.startsWith(filepath) && path !== filepath
        ) ||
        filepath === '.'
      ) {
        return undefined; // do not include the directory, but still walk its children
      }

      if (!relativePaths.some((path) => filepath.startsWith(path))) {
        return null;
      }

      if (!head && !stage && workdir) {
        const isIgnored = await ignored({
          fs,
          dir: publication.dirPath,
          filepath,
        });
        if (isIgnored) {
          return null;
        }
      }
      const details = await getDetails({ head, workdir, stage });
      return {
        filepath: gitPathToAbsolute(filepath, publication.dirPath),
        ...details,
      };
    },
    async reduce(parent: GitRepoTreeItem, children: GitRepoTreeItem[]) {
      if (parent === undefined) return children.flat();
      return Object.assign(parent, { children });
    },
  })) as GitRepoTreeItem[];
  result.forEach((node) => store.dispatch(replaceNode(node)));
};

interface WalkerEntries {
  head: WalkerEntry | null;
  workdir: WalkerEntry | null;
  stage: WalkerEntry | null;
}

async function getDetails(
  entries: WalkerEntries
): Promise<Pick<GitRepoTreeItem, 'status' | 'stats' | 'isDirectory'>> {
  const [status, stats] = await Promise.all([
    getStatus(entries),
    entries.workdir?.stat(),
  ]);
  return {
    status,
    stats,
    // eslint-disable-next-line no-bitwise
    isDirectory: stats ? Boolean(stats.mode & fs.constants.S_IFDIR) : undefined,
  };
}

async function getStatus({ head, workdir, stage }: WalkerEntries) {
  const [headType, workdirType, stageType] = await Promise.all([
    head && head.type(),
    workdir && workdir.type(),
    stage && stage.type(),
  ]);
  // Figure out the oids for files, using the staged oid for the working dir oid if the stats match.
  const headOid = headType === 'blob' ? await head?.oid() : undefined;
  const stageOid = stageType === 'blob' ? await stage?.oid() : undefined;
  let workdirOid;
  if (headType !== 'blob' && workdirType === 'blob' && stageType !== 'blob') {
    // We don't actually NEED the sha. Any sha will do
    workdirOid = '42';
  } else if (workdirType === 'blob') {
    workdirOid = await workdir?.oid();
  }
  const matrix = [undefined, headOid, workdirOid, stageOid];
  const result = matrix.map((value) => matrix.indexOf(value));
  result.shift(); // remove leading undefined entry

  return {
    head: result[0],
    workdir: result[1],
    stage: result[2],
  } as GitFileStatus;
}
