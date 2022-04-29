import { Typography } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activePublication,
  updatePublicationField,
} from 'src/shared/redux/slices/loadPublicationsSlice';
import Button from '../../components/Button/Button';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import ViewContent from '../../components/ViewContent/ViewContent';

const Description = () => {
  const project = useSelector(activePublication);
  const dispatch = useDispatch();

  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {project?.name}
      </Typography>
      {project && (
        <>
          <Typography variant='caption' component='h2'>
            {t('ProjectList.projectDetails').toLocaleUpperCase()}:
          </Typography>
          <Button
            fullWidth
            variant='contained'
            onClick={() =>
              dispatch(
                updatePublicationField({
                  id: project.id,
                  field: 'keepDescriptionVisible',
                  value: true,
                })
              )
            }
          >
            {t('ProjectInfo.buttonText', {
              count: 1,
              label: t('ProjectDetails.projectDescription'),
            })}
          </Button>
          <ProjectDetails project={project} noLabel />
        </>
      )}
    </ViewContent>
  );
};

export default Description;
