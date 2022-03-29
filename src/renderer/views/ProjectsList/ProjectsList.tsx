import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import { Publication } from '../../../shared/types';
import ProjectTable from './subcomponents/ProjectsTable/ProjectsTable';
import Button from '../../components/Button/Button';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { VIEWS } from '../../constants/Views';

const ProjectsList = () => {
  const { t } = useTranslation();

  const publications: Publication[] = [
    {
      id: '3afd37c1-d666-45ae-a2fa-03920c45793b',
      collaborators: [],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
      name: 'A name',
      packageManager: 'npm',
      useSass: true,
      useTypescript: true,
      creationDate: 1648141413139,
      lastUpdate: 1648141413139,
      tags: ['tag'],
      status: 'cloned',
    },
    {
      id: '3afd37c1-d666-45ae-a2fa-03920c424213b',
      collaborators: [],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
      name: 'Name nr 2',
      packageManager: 'npm',
      useSass: true,
      useTypescript: true,
      creationDate: 1648141413139,
      lastUpdate: 1648141413139,
      tags: ['tag', 'tag2'],
      status: 'remote',
    },
  ];

  const dispatch = useDispatch();

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
