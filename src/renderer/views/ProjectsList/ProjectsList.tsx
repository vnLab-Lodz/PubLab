import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import ProjectTable from './subcomponents/ProjectsTable/ProjectsTable';
import Button from '../../components/Button/Button';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { VIEWS } from '../../constants/Views';
import { loadedPublicationsList } from '../../../shared/redux/slices/loadPublicationsSlice';

const ProjectsList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const publications = useSelector(loadedPublicationsList);

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1' mb={4}>
          {t('views.projects_list')}
        </Typography>
        <ProjectTable publications={publications} />
        <Button
          variant='contained'
          fullWidth
          isMajor
          color='green'
          onClick={() => dispatch(updateCurrentView(VIEWS.ADD_PROJECT))}
        >
          {t('ProjectList.create')}
        </Button>
      </ViewContent>
    </ThemeProvider>
  );
};

export default ProjectsList;
