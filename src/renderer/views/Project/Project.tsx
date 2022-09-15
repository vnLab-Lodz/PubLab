import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  activePublication,
  updatePublicationField,
} from 'src/shared/redux/slices/loadPublicationsSlice';
import Button from '../../components/Button/Button';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import { SeparatedSection } from '../../components/Section/Section';
import Snippets from '../../components/Snippets/Snippets';
import ViewContent from '../../components/ViewContent/ViewContent';

const Description = () => {
  const project = useSelector(activePublication);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {project?.name}
      </Typography>
      {project && (
        <>
          <SeparatedSection>
            <Typography variant='body2' component='h2'>
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
                label: t('ProjectList.projectDetails'),
              })}
            </Button>
            <ProjectDetails project={project} noLabel biggerText />
          </SeparatedSection>

          <SeparatedSection>
            <Typography variant='body2' component='h2'>
              {t('publication.snippets').toLocaleUpperCase()}:
            </Typography>
            <Button
              fullWidth
              variant='contained'
              onClick={() =>
                dispatch(
                  updatePublicationField({
                    id: project.id,
                    field: 'keepSnippetsVisible',
                    value: true,
                  })
                )
              }
            >
              {t('ProjectInfo.buttonText', {
                label: t('publication.snippets'),
              })}
            </Button>
            <Snippets project={project} isAccordion noLabel />
          </SeparatedSection>

          <SeparatedSection>
            <Typography
              variant='body2'
              component='h2'
              textTransform='uppercase'
            >
              {t('Terminal.project_server')}:
            </Typography>
            <Button
              fullWidth
              variant='contained'
              onClick={() =>
                dispatch(
                  updatePublicationField({
                    id: project.id,
                    field: 'keepServerVisible',
                    value: true,
                  })
                )
              }
            >
              {t('ProjectInfo.buttonText', {
                label: t('Terminal.project_server'),
              })}
            </Button>
            <Box mt={1} mb={3}>
              <Typography variant='subtitle1'>{t('Terminal.info')}</Typography>
            </Box>
          </SeparatedSection>

          <SeparatedSection>
            <Typography variant='body2' component='p'>
              {t('publication.package_manager').toLocaleUpperCase()}
              {': '}
              <b> {project.packageManager.toLocaleUpperCase()}</b>
            </Typography>
            <Typography variant='body2' component='p'>
              {t('publication.technology_extensions').toLocaleUpperCase()}
              {': '}
              <b>
                {listTechnologyExtensions({
                  ts: project.useTypescript,
                  sass: project.useSass,
                })}
              </b>
            </Typography>
          </SeparatedSection>
        </>
      )}
    </ViewContent>
  );
};

export default Description;

function listTechnologyExtensions(include: { ts: boolean; sass: boolean }) {
  const list = [];
  if (include.ts) list.push('typescript');
  if (include.sass) list.push('sass');
  return list.join(', ').toLocaleUpperCase();
}
