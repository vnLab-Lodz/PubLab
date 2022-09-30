import { BranchComparison } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import compareBranchesUtil from '../../utils/git/compareBranches';

const compareBranches: IpcEventHandler<BranchComparison> = async (
  _,
  branchA?: string,
  branchB?: string,
  opts?: { useRemote?: boolean }
) => {
  const result = await compareBranchesUtil(branchA, branchB, opts);
  return result;
};

export default compareBranches;
