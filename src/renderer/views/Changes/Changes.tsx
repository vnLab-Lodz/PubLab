import React, { useState } from 'react';
import ViewContent from '../../components/ViewContent/ViewContent';
import CurrentChanges from './subcomponents/CurrentChanges/CurrentChanges';
import CommitForm from './subcomponents/CommitForm/CommitForm';
import PublicationHeader from '../../components/PublicationHeader/PublicationHeader';
import SyncStatusIndicators from './subcomponents/SyncStatusIndicators/SyncStatusIndicators';

const Changes = () => {
  const [isCommitFormOpen, setCommitFormOpen] = useState(false);
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
