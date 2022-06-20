import { IconButton, Typography } from '@mui/material';
import React from 'react';
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
  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {project?.name}
      </Typography>
      <IconButton onClick={() => ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS)}>
        <RefreshIcon />
      </IconButton>
      <Section>
        <CurrentChanges />
      </Section>
      <Button variant='contained' fullWidth>
        {t('Changes.buttons.create')}
      </Button>
    </ViewContent>
  );
};

export default Changes;
