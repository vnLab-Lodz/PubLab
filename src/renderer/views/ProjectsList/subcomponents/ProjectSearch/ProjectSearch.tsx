import { Autocomplete } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../../../shared/types';
import SearchField from '../../../../components/SearchField/SearchField';
import { addPrefix } from '../../formatTags';

interface Props {
  publications: Publication[];
  onChange: (terms: string[]) => void;
}

const ProjectSearch: React.FC<Props> = ({ publications, onChange }) => {
  const { t } = useTranslation();
  return (
    <Autocomplete
      options={getAutocompleteOptions(publications)}
      onChange={(_, value) => onChange(value)}
      renderInput={(params) => (
        <SearchField
          {...params}
          InputProps={{
            'aria-label': t('common.search'),
            ...params.InputProps,
          }}
        />
      )}
      size='small'
      freeSolo
      multiple
    />
  );
};

export default ProjectSearch;

function getAutocompleteOptions(publications: Publication[]) {
  const options = [] as string[];
  publications.forEach(({ tags }) => {
    tags.forEach((tag) => {
      const tagWithPrefix = addPrefix(tag);
      if (!options.includes(tagWithPrefix)) options.push(tagWithPrefix);
    });
  });
  return options;
}
