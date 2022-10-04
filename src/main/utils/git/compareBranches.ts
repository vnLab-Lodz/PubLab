import { ReadCommitResult } from 'isomorphic-git';
import path from 'path';
import { mainStore as store } from 'src/main';
import { ArrElement } from 'src/shared/types/util';
import { MAIN_BRANCH } from '../../../shared/constants';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { BranchComparison, LocalPublication } from '../../../shared/types';
import createGitHubHandler from '../../lib/gitHubHandler';
import createGitRepoHandler from '../../lib/gitRepoHandler';
import { createLogger } from '../../logger';

// TODO(FIX): This method does not work properly due to github returning paginated responses
const compareBranches = async ({
  referenceBranch,
  targetBranch,
  useRemote,
}: {
  referenceBranch?: string;
  targetBranch?: string;
  useRemote?: boolean;
}): Promise<BranchComparison> => {
  const logger = createLogger();
  try {
    const publication = activePublication(store.getState()) as LocalPublication;
    const token = store.getState().currentUser.auth.accessToken?.value;
    if (!publication) throw new Error('No active publication!');
    if (!token) throw new Error('No user is logged in!');

    const repoHandler = createGitRepoHandler(publication);
    const githubHandler = createGitHubHandler(token);
    const promises = await Promise.all([
      repoHandler.log(referenceBranch),
      useRemote
        ? githubHandler.getCommits(
            {
              owner: publication.owner,
              name: path.basename(publication.dirPath),
            },
            targetBranch
          )
        : repoHandler.log(targetBranch || MAIN_BRANCH),
    ]);
    const [commitsA, commitsB] = promises.map((p) =>
      p.map(normalizeCommitData)
    );

    return {
      ahead: shaCompare(commitsB, commitsA),
      behind: shaCompare(commitsA, commitsB),
    };
  } catch (err) {
    logger.appendError(err as string);
    return { ahead: 0, behind: 0 };
  }
};

export default compareBranches;

type GitHubHandlerGetCommitResult = ArrElement<
  Awaited<ReturnType<ReturnType<typeof createGitHubHandler>['getCommits']>>
>;

function normalizeCommitData(
  data: ReadCommitResult | GitHubHandlerGetCommitResult
) {
  if ('oid' in data) return { sha: data.oid };
  return { sha: data.sha };
}

type ShaData = ReturnType<typeof normalizeCommitData>;

function shaCompare(ref: ShaData[], target: ShaData[]) {
  return ref.filter(
    (refCommit) =>
      !target.some((targetCommit) => targetCommit.sha === refCommit.sha)
  ).length;
}
