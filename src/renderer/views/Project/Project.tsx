import { Typography, Button } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activePublication,
  updatePublicationField,
} from 'src/shared/redux/slices/loadPublicationsSlice';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import ViewContent from '../../components/ViewContent/ViewContent';

const Description = () => {
  const project = useSelector(activePublication);
  const dispatch = useDispatch();

  return (
    <ViewContent>
      <Typography component='h2' variant='body2'>
        {t('ProjectDetails.projectDescription').toLocaleUpperCase()}:
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
