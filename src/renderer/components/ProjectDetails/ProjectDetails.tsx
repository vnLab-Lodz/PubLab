import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../shared/types';
import Section from '../Section/Section';

interface Props {
  project: Publication;
  noLabel?: boolean;
}

const ProjectDetails = ({ project, noLabel }: Props) => {
  const { t } = useTranslation();

  return (
    <Section mt={0} mb={2}>
      {!noLabel && (
        <Typography variant='caption' component='h2' mb={2}>
          {t('ProjectList.projectDetails').toLocaleUpperCase()}:
        </Typography>
      )}
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
      <Box component='p' mt={1} mb={3}>
        <Typography> {project?.description}</Typography>
      </Box>
    </Section>
  );
};

ProjectDetails.defaultProps = {
  noLabel: false,
};

export default ProjectDetails;
