import React, { useMemo } from 'react';
import { GitRepoTreeItem } from 'src/shared/types/api';
import { findByPath } from 'src/shared/utils/repoStatus/tree';
import path from 'path';
import Section from 'src/renderer/components/Section/Section';
import { Box, Typography } from '@mui/material';
import { LocalPublication } from 'src/shared/types';
import { useTranslation } from 'react-i18next';
import { formatPath } from 'src/renderer/utils/formatPath';
import FileTreeItem from '../FileTreeItem/FileTreeItem';
import FileTree from '../FileTree/FileTree';

type Props = {
  searchTerm: string;
  RepoTree: GitRepoTreeItem;
  project: LocalPublication;
};

const SearchResultTree: React.FC<{
  treePath: string;
  tree: GitRepoTreeItem;
  project: LocalPublication;
}> = ({ project, treePath, tree }) => {
  const getPath = () => path.join(project.dirPath, 'publication');
  const [currentDirectory, setCurrentDirectory] = React.useState(getPath);

  return (
    <Box my={(theme) => theme.spacing(2)}>
      <Box sx={{ margin: '1rem 0' }}>
        <Typography variant='caption'>
          {formatPath(treePath, project.dirPath)}
        </Typography>
      </Box>
      <FileTree
        currentDirectory={currentDirectory}
        setCurrentDirectory={setCurrentDirectory}
      >
        <FileTreeItem
          item={tree}
          treeLevel={0}
          dirPath={project.dirPath}
          notRendered
        />
      </FileTree>
    </Box>
  );
};

const FileSearchExplorer: React.FC<Props> = ({
  searchTerm,
  RepoTree,
  project,
}) => {
  const { t } = useTranslation();

  const [foundDirectories, foundFiles] = useMemo<
    Readonly<[Map<string, GitRepoTreeItem>, Map<string, GitRepoTreeItem>]>
  >(() => {
    if (!searchTerm || !RepoTree) return [new Map(), new Map()];

    const publicationPath = path.join(project.dirPath, 'publication');
    const publication = findByPath(RepoTree, publicationPath);
    if (!publication) return [new Map(), new Map()];

    const directories = new Map<string, GitRepoTreeItem>();
    const files = new Map<string, GitRepoTreeItem>();

    const traverse = (tree: GitRepoTreeItem) => {
      for (let i = 0; i < tree.children.length; i++) {
        const child = tree.children[i];
        const parts = child.filepath.split(path.sep);

        if (parts.length > 0) {
          const lastIndex = parts.length - 1;
          const pathMatched = parts[lastIndex].includes(searchTerm);
          const indexSearchTerm = path.join(searchTerm, 'index');
          const indexPathTarget = path.join(...parts.slice(-2));

          const indexPathMatched = indexPathTarget.includes(indexSearchTerm);

          if (pathMatched || indexPathMatched) {
            const map = child.isDirectory ? directories : files;
            if (!map.has(child.filepath)) {
              map.set(child.filepath, { ...tree, children: [child] });
            }
          }
        }

        traverse(child);
      }
    };

    traverse(publication);

    return [directories, files] as const;
  }, [searchTerm, RepoTree]);

  return (
    <Section>
      <Box display='flex'>
        <Typography
          component='h2'
          variant='caption'
          style={{ textTransform: 'uppercase' }}
        >
          {t('Files.search.results')}:{' '}
          <Typography
            component='span'
            variant='body1'
            sx={{
              fontWeight: 'bold',
              textTransform: 'initial',
              ml: (theme) => theme.spacing(1),
            }}
          >
            {searchTerm}
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ my: (theme) => theme.spacing(3) }}>
        <Typography
          variant='h3'
          component='h3'
          mb={(theme) => theme.spacing(2)}
        >
          {t('Files.search.directories')}:{' '}
          <strong>{foundDirectories.size}</strong>
        </Typography>
        {foundDirectories.size === 0 && (
          <Typography variant='body1' component='p'>
            {t('Files.search.no_match', {
              target: t('Files.search.no_directories'),
            })}
          </Typography>
        )}
        {[...foundDirectories.entries()].map(([treePath, tree]) => (
          <SearchResultTree
            key={treePath}
            tree={tree}
            treePath={treePath}
            project={project}
          />
        ))}
      </Box>
      <Box sx={{ my: (theme) => theme.spacing(3) }}>
        <Typography
          variant='h3'
          component='h3'
          mb={(theme) => theme.spacing(2)}
        >
          {t('Files.search.files')}: <strong>{foundFiles.size}</strong>
        </Typography>
        {foundFiles.size === 0 && (
          <Typography variant='body1' component='p'>
            {t('Files.search.no_match', {
              target: t('Files.search.no_files'),
            })}{' '}
          </Typography>
        )}
        {[...foundFiles.entries()].map(([treePath, tree]) => (
          <SearchResultTree
            key={treePath}
            tree={tree}
            treePath={treePath}
            project={project}
          />
        ))}
      </Box>
    </Section>
  );
};

export default FileSearchExplorer;
