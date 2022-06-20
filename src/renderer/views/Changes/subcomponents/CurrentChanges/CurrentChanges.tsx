import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectRepoTree } from '../../../../../shared/redux/slices/repoStatusSlice';
import * as checkStatus from '../../../../../shared/utils/repoStatus/statusChecks';
import * as repoTree from '../../../../../shared/utils/repoStatus/tree';
import * as Styled from './style';
import { gitStage } from '../../../../ipc';
import FilesByFolder from '../ChangedFiles/FilesByFolder';
import Button from '../../../../components/Button/Button';

interface Props {
  openCommitForm: () => void;
}

const CurrentChanges: React.FC<Props> = ({ openCommitForm }) => {
  const { t } = useTranslation();
  const tree = useSelector(selectRepoTree);
  const changes = tree
    ? repoTree.search(tree, (node) => checkStatus.isChanged(node.status))
    : [];
  return (
    <>
      {changes.length ? (
        <>
          <Typography variant='h1' component='h2'>
            {t('Changes.prompts.which')}
          </Typography>
          <Styled.TextButton
            variant='text'
            onClick={() => changes.forEach((item) => gitStage(item))}
          >
            {t('common.choose')} {t('common.all')}
          </Styled.TextButton>
          <Box mb={3}>
            <FilesByFolder items={changes} />
          </Box>
          <Button
            variant='contained'
            fullWidth
            onClick={openCommitForm}
            disabled={
              !changes.some((changedFile) =>
                checkStatus.isStaged(changedFile.status)
              )
            }
          >
            {t('Changes.buttons.create')}
          </Button>
        </>
      ) : (
        <Typography variant='h1' component='h2'>
          {t('Changes.prompts.no_changes')}
        </Typography>
      )}
    </>
  );
};

export default CurrentChanges;
