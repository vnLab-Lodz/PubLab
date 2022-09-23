import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchField from 'src/renderer/components/SearchField/SearchField';
import IconButton from 'src/renderer/components/IconButton/IconButton';
import { createSelector } from '@reduxjs/toolkit';
import { GitRepoTreeItem } from 'src/shared/types/api';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import ViewContent from '../../components/ViewContent/ViewContent';
import { selectRepoTree } from '../../../shared/redux/slices/repoStatusSlice';
import PublicationHeader from '../../components/PublicationHeader/PublicationHeader';
import FileExplorer from './subcomponents/FileExplorer/FileExplorer';
import FileSearchExplorer from './subcomponents/FileSearchExplorer/FileSearchExplorer';

const selectSortedTree = createSelector<
  [typeof selectRepoTree],
  GitRepoTreeItem | undefined
>([selectRepoTree], (RepoTree) => {
  if (!RepoTree) return undefined;

  const collator = new Intl.Collator([], { numeric: true });
  const traverse = (tree: GitRepoTreeItem): GitRepoTreeItem => ({
    ...tree,
    children: tree.children
      .map(traverse)
      .sort((a, b) => collator.compare(a.filepath, b.filepath)),
  });

  return traverse(RepoTree);
});

const Files = () => {
  const project = useSelector(activePublication) as LocalPublication;
  const RepoTree = useSelector(selectSortedTree);
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
  const ref = useRef<any>(null);

  const handleClear = () => {
    setSearchTerm(null);
    if (!ref.current) return;

    const clearBtn = ref.current.getElementsByClassName(
      'MuiAutocomplete-clearIndicator'
    )[0];
    clearBtn.click();
  };

  if (RepoTree === undefined) return <></>;

  return (
    <ViewContent sx={{ overflowY: 'scroll' }}>
      <PublicationHeader dimmedIcon={false}>
        <Autocomplete
          ref={ref}
          options={[]}
          onChange={(_, value) => setSearchTerm(value)}
          renderInput={(params) => (
            <SearchField
              {...params}
              InputProps={{
                'aria-label': 'Search',
                sx: { overflow: 'hidden' },
                ...params.InputProps,
              }}
            />
          )}
          size='small'
          freeSolo
          sx={{ mr: (theme) => (!searchTerm ? theme.spacing(1) : undefined) }}
        />
        {searchTerm && (
          <IconButton
            size='small'
            sx={{
              borderRadius: 0,
              padding: 0,
              color: 'text.primary',
              mr: (theme) => theme.spacing(1),
              ml: '0.5rem',
            }}
            onClick={handleClear}
          >
            <Close />
          </IconButton>
        )}
      </PublicationHeader>
      {!searchTerm ? (
        <FileExplorer RepoTree={RepoTree} project={project} />
      ) : (
        <FileSearchExplorer
          searchTerm={searchTerm}
          RepoTree={RepoTree}
          project={project}
        />
      )}
    </ViewContent>
  );
};

export default Files;
