import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { ipcRenderer } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MAIN_BRANCH } from '../../../../../shared/constants';
import { selectMainBranchSync } from '../../../../../shared/redux/slices/mainBranchSyncSlice';
import { BranchComparison } from '../../../../../shared/types';
import { CHANNELS } from '../../../../../shared/types/api';
import Button from '../../../../components/Button/Button';
import {
  addLoader,
  removeLoader,
} from '../../../../../shared/redux/slices/loadersSlice';
import LoaderOverlay from '../../../../components/LoaderOverlay/LoaderOverlay';

interface Props {}

const SyncButtons: React.FC<Props> = () => {
  const syncStatus = useSelector(selectMainBranchSync).status;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isPublishDialogOpen, setPublishDialogOpen] = useState(false);
  const [loaderId, setLoaderID] = useState('');

  return (
    <Box sx={(theme) => ({ my: theme.spacing(3) })}>
      <Button
        variant='contained'
        fullWidth
        disabled={!syncStatus.ahead}
        onClick={async () => {
          const id = uuidv4();
          setLoaderID(id);
          dispatch(
            addLoader({
              id,
              i18n: {
                key: t('Changes.repoSync.loaders.sync'),
              },
            })
          );
          await mergeMain();
          ipcRenderer.invoke(CHANNELS.GIT.RUN_SYNC_CHECK);
          dispatch(removeLoader(id));
          setLoaderID('');
        }}
      >
        {t('Changes.repoSync.button_sync')}
      </Button>
      <Button
        variant='contained'
        fullWidth
        disabled={!syncStatus.behind}
        onClick={() => {
          setPublishDialogOpen(true);
        }}
      >
        {t('Changes.repoSync.button_publish')}
      </Button>
      <Dialog
        open={isPublishDialogOpen}
        aria-describedby='publish-dialog-description'
        PaperProps={{
          sx: ({ palette }) => ({
            background: palette.background.default,
            borderRadius: '0',
          }),
        }}
        fullWidth
      >
        <DialogContent>
          <DialogContentText id='publish-dialog-description'>
            <Typography color='primary'>
              {t('Changes.repoSync.tooltip_publish')}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialogOpen(false)}>
            {t('common.go_back')}
          </Button>
          <Button
            onClick={async () => {
              const id = uuidv4();
              setLoaderID(id);
              setPublishDialogOpen(false);
              dispatch(
                addLoader({
                  id,
                  i18n: {
                    key: t('Changes.repoSync.loaders.publish'),
                  },
                })
              );
              await publish(syncStatus);
              ipcRenderer.invoke(CHANNELS.GIT.RUN_SYNC_CHECK);
              dispatch(removeLoader(id));
              setLoaderID('');
            }}
            autoFocus
            variant='contained'
          >
            {t('common.go')}
          </Button>
        </DialogActions>
      </Dialog>
      <LoaderOverlay id={loaderId} />
    </Box>
  );
};

export default SyncButtons;

async function mergeMain() {
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, `remotes/origin/${MAIN_BRANCH}`);
  await ipcRenderer.invoke(CHANNELS.GIT.CHECKOUT);
  await ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS);
}
async function publish(mainBranchStatus: BranchComparison) {
  if (mainBranchStatus.ahead) await mergeMain();

  const userBranch = await ipcRenderer.invoke(CHANNELS.GIT.CURRENT_BRANCH);
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, userBranch, MAIN_BRANCH);
  await ipcRenderer.invoke(CHANNELS.GIT.CHECKOUT);
  await ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS);
}
