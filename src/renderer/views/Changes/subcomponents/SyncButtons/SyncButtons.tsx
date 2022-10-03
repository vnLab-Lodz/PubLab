import { ipcRenderer } from 'electron';
import React from 'react';
import { useSelector } from 'react-redux';
import { MAIN_BRANCH } from '../../../../../shared/constants';
import { selectMainBranchSync } from '../../../../../shared/redux/slices/mainBranchSyncSlice';
import { BranchComparison } from '../../../../../shared/types';
import { CHANNELS } from '../../../../../shared/types/api';
import Button from '../../../../components/Button/Button';

interface Props {}

const SyncButtons: React.FC<Props> = () => {
  const syncStatus = useSelector(selectMainBranchSync).status;
  return (
    <>
      <Button
        variant='contained'
        fullWidth
        disabled={!syncStatus.ahead}
        onClick={() => mergeMain()}
      >
        {`Sync main, ahead by ${syncStatus.ahead}`}
      </Button>
      <Button
        variant='contained'
        fullWidth
        disabled={!syncStatus.behind}
        onClick={() => publish(syncStatus)}
      >
        {`Publish changes, behind by ${syncStatus.behind}`}
      </Button>
    </>
  );
};

export default SyncButtons;

async function mergeMain() {
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, `remotes/origin/${MAIN_BRANCH}`);
  await ipcRenderer.invoke(CHANNELS.GIT.CHECKOUT);
}
async function publish(mainBranchStatus: BranchComparison) {
  if (mainBranchStatus.ahead) {
    await mergeMain();
  }
  const userBranch = await ipcRenderer.invoke(CHANNELS.GIT.CURRENT_BRANCH);
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, userBranch, MAIN_BRANCH);
  await ipcRenderer.invoke(
    CHANNELS.GIT.MERGE,
    `remotes/origin/${MAIN_BRANCH}`,
    userBranch
  );
}
