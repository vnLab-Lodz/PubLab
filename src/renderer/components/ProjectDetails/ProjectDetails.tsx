import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../shared/types';

interface Props {
  project: Publication;
  noLabel?: boolean;
  biggerText?: boolean;
}

const ProjectDetails = ({ project, noLabel, biggerText }: Props) => {
  const { t } = useTranslation();

  return (
    <Box mt={0} mb={3}>
      {!noLabel && (
        <>
          <Typography variant='caption' component='h2' mb={2}>
            {t('ProjectList.projectDetails').toLocaleUpperCase()}:
          </Typography>

          <Typography variant='h1' component='h3'>
            {project.name}
          </Typography>
        </>
      )}
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
      <Box component='p' mt={1} mb={3}>
        <Typography variant={biggerText ? 'subtitle1' : 'body1'}>
          {project?.description}
        </Typography>
      </Box>
    </Box>
  );
};

ProjectDetails.defaultProps = {
  noLabel: false,
  biggerText: false,
};

export default ProjectDetails;
