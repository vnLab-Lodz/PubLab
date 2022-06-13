import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ipcRenderer } from 'electron';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import Button from '../../components/Button/Button';
import ViewContent from '../../components/ViewContent/ViewContent';
import CurrentChanges from './subcomponents/CurrentChanges/CurrentChanges';
import { CHANNELS } from '../../../shared/types/api';
import Section from '../../components/Section/Section';

const Changes = () => {
  const { t } = useTranslation();
  const project = useSelector(activePublication);
  const [tab, setTab] = useState('changes' as 'changes' | 'history');
  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {project?.name}
      </Typography>
      <IconButton onClick={() => ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS)}>
        <RefreshIcon />
      </IconButton>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={() => setTab('changes')}
          fullWidth
          variant={tab === 'changes' ? 'contained' : 'outlined'}
          sx={{ m: 0 }}
        >
          {t('Changes.current_changes')}
        </Button>
        <Button
          onClick={() => setTab('history')}
          fullWidth
          variant={tab === 'history' ? 'contained' : 'outlined'}
          sx={{ m: 0 }}
        >
          {t('Changes.history')}
        </Button>
      </Box>
      <Section>
        {tab === 'changes' && <CurrentChanges />}
        {tab === 'history' && 'to be implemented'}
      </Section>
    </ViewContent>
  );
};

export default Changes;
