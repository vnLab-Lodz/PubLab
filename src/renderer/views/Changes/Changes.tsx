import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import ViewContent from '../../components/ViewContent/ViewContent';
import CurrentChanges from './subcomponents/CurrentChanges/CurrentChanges';
import CommitForm from './subcomponents/CommitForm/CommitForm';
import PublicationHeader from '../../components/PublicationHeader/PublicationHeader';
import SyncStatusIndicators from './subcomponents/SyncStatusIndicators/SyncStatusIndicators';
import { CHANNELS } from '../../../shared/types/api';

const Changes = () => {
  const [isCommitFormOpen, setCommitFormOpen] = useState(false);

  useEffect(() => {
    ipcRenderer.invoke(CHANNELS.GIT.RUN_SYNC_CHECK);
  }, []);

  return (
    <ViewContent>
      <PublicationHeader
        sx={({ spacing }) => ({
          marginBottom: spacing(4),
        })}
      >
        <SyncStatusIndicators />
      </PublicationHeader>
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
