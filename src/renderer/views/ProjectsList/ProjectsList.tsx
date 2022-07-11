import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import ProjectTable from './subcomponents/ProjectsTable/ProjectsTable';
import Button from '../../components/Button/Button';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { VIEWS } from '../../constants/Views';
import { loadedPublicationsList } from '../../../shared/redux/slices/loadPublicationsSlice';
import ProjectSearch from './subcomponents/ProjectSearch/ProjectSearch';
import { Publication } from '../../../shared/types';
import { hasTagPrefix, removePrefix } from './formatTags';

const ProjectsList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const publications = useSelector(loadedPublicationsList);
  const [searchTerms, setSearchTerms] = useState([] as string[]);
  const filteredPublications = useMemo(
    () => searchFilter(publications, searchTerms),
    [publications, searchTerms]
  );

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Box mb={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h1'>{t('views.projects_list')}</Typography>
          <Box>
            <ProjectSearch
              publications={filteredPublications}
              onChange={(terms) => setSearchTerms(terms)}
            />
          </Box>
        </Box>
        <ProjectTable publications={filteredPublications} />
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

function searchFilter(publications: Publication[], terms: string[]) {
  if (terms.length === 0) return publications;
  return publications.filter((publication) =>
    terms.every((term) =>
      hasTagPrefix(term)
        ? publication.tags.includes(removePrefix(term))
        : publication.name
            .toLocaleLowerCase()
            .includes(term.toLocaleLowerCase())
    )
  );
}
