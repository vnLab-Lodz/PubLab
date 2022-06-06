import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ipcRenderer } from 'electron';
import { selectRepoTree } from '../../../shared/redux/slices/repoStatusSlice';
import * as checkStatus from '../../../shared/utils/repoStatus/statusChecks';
import * as repoTree from '../../../shared/utils/repoStatus/tree';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import ViewContent from '../../components/ViewContent/ViewContent';
import { gitCommit } from '../../ipc';
import ChangedFile from './subcomponents/ChangedFile/ChangedFile';
import { CHANNELS } from '../../../shared/types/api';

const Changes = () => {
  const tree = useSelector(selectRepoTree);
  const changes = tree
    ? repoTree.search(tree, (node) => checkStatus.isChanged(node.status))
    : [];
  const [commitMessage, setCommitMessage] = useState('');
  return (
    <ViewContent>
      <IconButton onClick={() => ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS)}>
        <RefreshIcon />
      </IconButton>
      {changes.map((item) => (
        <ChangedFile item={item} key={item.filepath} />
      ))}
      <TextField
        value={commitMessage}
        onChange={(event) => setCommitMessage(event.target.value)}
      />
      <Button
        onClick={() => {
          gitCommit(commitMessage);
          setCommitMessage('');
        }}
        disabled={!changes.find((item) => checkStatus.isStaged(item.status))}
      >
        COMMIT
      </Button>
    </ViewContent>
  );
};

export default Changes;
