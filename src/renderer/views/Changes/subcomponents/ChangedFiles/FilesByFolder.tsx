import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { activePublication } from 'src/shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from 'src/shared/types';
import { GitRepoTreeItem } from '../../../../../shared/types/api';
import { Header } from '../../../../components/FileDisplay/Columns';
import ChangedFile from './ChangedFile';
import { formatPath } from '../../../../utils/formatPath';

interface Props {
  items: GitRepoTreeItem[];
  noButtons?: boolean;
}

const FilesByFolder: React.FC<Props> = ({ items, noButtons }) => {
  const project = useSelector(activePublication) as LocalPublication;

  const groupedFiles = items.reduce((_group, item) => {
    const group = _group;
    const folderPath = formatPath(item.filepath, project.dirPath);

    group[folderPath] = group[folderPath] || [];
    group[folderPath].push(item);
    return group;
  }, {} as { [key: string]: GitRepoTreeItem[] });

  return (
    <>
      {Object.entries(groupedFiles).map(([key, files]) => (
        <Box key={key}>
          <Box ml={noButtons ? 0 : 3} mt={2}>
            <Header
              nameSubstitute={<Typography variant='body2'>{key}</Typography>}
            />
          </Box>
          <Box>
            {files.map((file) => (
              <ChangedFile
                item={file}
                key={file.filepath}
                noButton={noButtons}
              />
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

FilesByFolder.defaultProps = {
  noButtons: false,
};

export default FilesByFolder;
