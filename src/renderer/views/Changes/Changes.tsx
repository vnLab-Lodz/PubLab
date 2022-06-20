import { IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ipcRenderer } from 'electron';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import ViewContent from '../../components/ViewContent/ViewContent';
import CurrentChanges from './subcomponents/CurrentChanges/CurrentChanges';
import { CHANNELS } from '../../../shared/types/api';
import CommitForm from './subcomponents/CommitForm/CommitForm';

const Changes = () => {
  const project = useSelector(activePublication);
  const [isCommitFormOpen, setCommitFormOpen] = useState(false);
  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {project?.name}
      </Typography>
      <IconButton onClick={() => ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS)}>
        <RefreshIcon />
      </IconButton>
      {isCommitFormOpen ? (
        <CommitForm closeForm={() => setCommitFormOpen(false)} />
      ) : (
        <>
          <CurrentChanges openCommitForm={() => setCommitFormOpen(true)} />
        </>
      )}
    </ViewContent>
  );
};

export default Changes;
