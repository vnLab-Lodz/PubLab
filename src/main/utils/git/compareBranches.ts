import { Octokit } from '@octokit/rest';
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

    const { log, currentBranch } = createGitRepoHandler(publication);

    if (!useRemote) {
      const promises = [log(referenceBranch), log(targetBranch ?? MAIN_BRANCH)];
      const [commitsA, commitsB] = (await Promise.all(promises)).map(
        (commits) => commits.map(normalizeCommitData)
      );

      return {
        ahead: shaCompare(commitsB, commitsA),
        behind: shaCompare(commitsA, commitsB),
      };
    }

    const octokit = new Octokit({ auth: token });
    const base = referenceBranch ?? (await currentBranch());
    const head = targetBranch ?? MAIN_BRANCH;
    const { data } = await octokit.rest.repos.compareCommitsWithBasehead({
      owner: publication.owner,
      repo: path.basename(publication.dirPath),
      basehead: `${base}...${head}`,
    });

    const { ahead_by: ahead, behind_by: behind } = data;

    return { ahead, behind };
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
  if ('oid' in data) return data.oid;
  return data.sha;
}

type ShaData = ReturnType<typeof normalizeCommitData>;

function shaCompare(ref: ShaData[], target: ShaData[]) {
  return ref.filter(
    (refCommit) => !target.some((targetCommit) => targetCommit === refCommit)
  ).length;
}
