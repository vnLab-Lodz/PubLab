import {
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
} from '@mui/material';
import { ipcRenderer, shell } from 'electron';
import { t } from 'i18next';
import React from 'react';
import { CHANNELS } from '../../../shared/types/api';
import app from '../../../shared/utils/app';
import usePromiseSubscription from '../../hooks/usePromiseSubscription';
import Button from '../Button/Button';

interface Props {}

const DESCRIPTION_ID = 'no-node-dialog-description';
const NODE_URL = 'https://nodejs.org';

const NoNodeDialog: React.FC<Props> = () => {
  const [isNodeInstalled] = usePromiseSubscription(
    () => {
      const result = ipcRenderer.invoke(CHANNELS.NODE.VERIFY);
      return result;
    },
    true,
    []
  );

  const [ignore, setIgnore] = React.useState(false);

  return (
    <Dialog
      open={!isNodeInstalled && !ignore}
      aria-describedby={DESCRIPTION_ID}
      PaperProps={{
        sx: ({ palette }) => ({
          background: palette.background.default,
          borderRadius: '0',
        }),
      }}
      fullWidth
    >
      <DialogContent>
        <DialogContentText id={DESCRIPTION_ID}>
          <Typography color='primary'>{t('NoNodeDialog.message')} </Typography>
        </DialogContentText>
        <Button onClick={() => shell.openExternal(NODE_URL)}>
          {t('NoNodeDialog.buttons.instructions')}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIgnore(true)}>
          {t('NoNodeDialog.buttons.ignore')}
        </Button>
        <Button
          onClick={() => {
            app.relaunch();
            app.exit();
          }}
          variant='contained'
        >
          {t('NoNodeDialog.buttons.restart')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoNodeDialog;
