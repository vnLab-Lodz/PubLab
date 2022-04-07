import { Box, Chip, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateSubview } from '../../../shared/redux/slices/currentViewSlice';
import { Publication } from '../../../shared/types';
import { SUBVIEWS } from '../../constants/Views';
import { mainTheme } from '../../theme';
import ViewContent from '../../components/ViewContent/ViewContent';
import CloseButton from '../../components/CloseButton/CloseButton';

interface Props {
  project: Publication;
}

const ProjectInfo = ({ project }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={mainTheme}>
      <ViewContent isSubview>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant='caption' component='h2'>
            {t('ProjectList.projectDetails').toLocaleUpperCase()}:
          </Typography>
          <CloseButton
            onClick={() => dispatch(updateSubview({ element: SUBVIEWS.NONE }))}
          />
        </Box>
        <Typography variant='h1' component='h3'>
          {project.name}
        </Typography>
        <Box mb={2}>
          {project.tags.map((tag) => (
            <Chip
              size='small'
              key={`project_${project.id}_${tag}`}
              label={tag}
              sx={{ mr: '0.5rem', mt: '0.5rem' }}
            />
          ))}
        </Box>
        {!!project.description && (
          <Box component='p' mt={1} pb={3} sx={{ borderBottom: '1px solid' }}>
            <Typography> {project.description}</Typography>
          </Box>
        )}
      </ViewContent>
    </ThemeProvider>
  );
};

export default ProjectInfo;
