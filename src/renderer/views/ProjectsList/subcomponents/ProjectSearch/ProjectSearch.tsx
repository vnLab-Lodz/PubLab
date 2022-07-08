import { Autocomplete } from '@mui/material';
import React from 'react';
import { Publication } from '../../../../../shared/types';
import SearchField from '../../../../components/SearchField/SearchField';

interface Props {
  publications: Publication[];
  onChange: (terms: string[]) => void;
}

const ProjectSearch: React.FC<Props> = ({ publications, onChange }) => (
  <Autocomplete
    options={getAutocompleteOptions(publications)}
    onChange={(_, value) => onChange(value)}
    renderInput={(params) => <SearchField {...params} />}
    size='small'
    freeSolo
    multiple
  />
);

export default ProjectSearch;

function getAutocompleteOptions(publications: Publication[]) {
  const options = [] as string[];
  publications.forEach(({ tags }) => {
    tags.forEach((tag) => !options.includes(tag) && options.push(`#${tag}`));
  });
  return options;
}
