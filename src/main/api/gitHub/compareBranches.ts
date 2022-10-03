import { BranchComparison } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import compareBranchesUtil from '../../utils/git/compareBranches';

const compareBranches: IpcEventHandler<BranchComparison> = async (
  _,
  {
    referenceBranch,
    targetBranch,
    useRemote,
  }: { referenceBranch?: string; targetBranch?: string; useRemote?: boolean }
) => {
  const result = await compareBranchesUtil({
    referenceBranch,
    targetBranch,
    useRemote,
  });
  return result;
};

export default compareBranches;
