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
import Snippets from '../../components/Snippets/Snippets';
import ViewContent from '../../components/ViewContent/ViewContent';
import * as Styled from './style';

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
          <Styled.Section>
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
                count: 1,
                label: t('ProjectDetails.projectDescription'),
              })}
            </Button>
            <ProjectDetails project={project} noLabel biggerText />
          </Styled.Section>

          <Styled.Section>
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
                count: 2,
                label: t('publication.snippets'),
              })}
            </Button>
            <Snippets project={project} isAccordion noLabel />
          </Styled.Section>

          <Styled.Section sx={{ border: 'none' }}>
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
          </Styled.Section>
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
