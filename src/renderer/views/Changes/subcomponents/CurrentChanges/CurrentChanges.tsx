import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { selectRepoTree } from '../../../../../shared/redux/slices/repoStatusSlice';
import {
  addLoader,
  removeLoader,
} from '../../../../../shared/redux/slices/loadersSlice';
import * as checkStatus from '../../../../../shared/utils/repoStatus/statusChecks';
import * as repoTree from '../../../../../shared/utils/repoStatus/tree';
import * as Styled from './style';
import { gitStage, gitUnstage } from '../../../../ipc';
import FilesByFolder from '../ChangedFiles/FilesByFolder';
import Button from '../../../../components/Button/Button';
import LoaderOverlay from '../../../../components/LoaderOverlay/LoaderOverlay';
import SyncButtons from '../SyncButtons/SyncButtons';

interface Props {
  openCommitForm: () => void;
}

const CurrentChanges: React.FC<Props> = ({ openCommitForm }) => {
  const { t } = useTranslation();
  const tree = useSelector(selectRepoTree);
  const dispatch = useDispatch();
  const [loaderId, setLoaderId] = useState('');
  const changes = tree
    ? repoTree.search(tree, (node) => checkStatus.isChanged(node.status))
    : [];
  const stagedCount = changes.reduce(
    (count, change) => count + (checkStatus.isStaged(change.status) ? 1 : 0),
    0
  );
  return (
    <>
      {changes.length ? (
        <>
          <Typography variant='h1' component='h2'>
            {t('Changes.prompts.which')}
          </Typography>
          <Styled.TextButton
            variant='text'
            onClick={async () => {
              const id = uuidv4();
              setLoaderId(id);
              dispatch(addLoader({ id }));
              await (stagedCount === changes.length ? gitUnstage : gitStage)(
                changes
              );
              dispatch(removeLoader(id));
            }}
          >
            {t(
              stagedCount === changes.length ? 'common.delete' : 'common.choose'
            )}{' '}
            {t('common.all')}
          </Styled.TextButton>
          <Box mb={3}>
            <FilesByFolder items={changes} />
          </Box>
          <Button
            variant='contained'
            fullWidth
            onClick={openCommitForm}
            disabled={!stagedCount}
          >
            {t('Changes.buttons.create')}
          </Button>
        </>
      ) : (
        <>
          <Typography variant='h1' component='h2'>
            {t('Changes.prompts.no_changes')}
          </Typography>
          <SyncButtons />
        </>
      )}
      <LoaderOverlay id={loaderId} />
    </>
  );
};

export default CurrentChanges;
