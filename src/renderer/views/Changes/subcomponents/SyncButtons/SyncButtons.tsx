import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { ipcRenderer } from 'electron';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MAIN_BRANCH } from '../../../../../shared/constants';
import { selectMainBranchSync } from '../../../../../shared/redux/slices/mainBranchSyncSlice';
import { BranchComparison } from '../../../../../shared/types';
import { CHANNELS } from '../../../../../shared/types/api';
import Button from '../../../../components/Button/Button';

interface Props {}

const SyncButtons: React.FC<Props> = () => {
  const syncStatus = useSelector(selectMainBranchSync).status;
  const { t } = useTranslation();

  const [isPublishDialogOpen, setPublishDialogOpen] = React.useState(false);

  return (
    <Box sx={(theme) => ({ my: theme.spacing(3) })}>
      <Button
        variant='contained'
        fullWidth
        disabled={!syncStatus.ahead}
        onClick={() => mergeMain()}
      >
        {t('Changes.repoSync.button_sync')}
      </Button>
      <Button
        variant='contained'
        fullWidth
        disabled={!syncStatus.behind}
        onClick={() => setPublishDialogOpen(true)}
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
            onClick={() => {
              setPublishDialogOpen(false);
              publish(syncStatus);
            }}
            autoFocus
            variant='contained'
          >
            {t('common.go')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SyncButtons;

async function mergeMain() {
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, MAIN_BRANCH);
  await ipcRenderer.invoke(CHANNELS.GIT.CHECKOUT);
}
async function publish(mainBranchStatus: BranchComparison) {
  if (mainBranchStatus.ahead) {
    await mergeMain();
  }
  const userBranch = await ipcRenderer.invoke(CHANNELS.GIT.CURRENT_BRANCH);
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, userBranch, MAIN_BRANCH);
  await ipcRenderer.invoke(CHANNELS.GIT.MERGE, MAIN_BRANCH, userBranch);
}
