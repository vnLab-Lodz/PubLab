import { Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import path from 'path';
import React from 'react';
import { GitRepoTreeItem } from '../../../../../shared/types/api';
import {
  isFullyStaged,
  isStaged,
} from '../../../../../shared/utils/repoStatus/statusChecks';
import { Header } from '../../../../components/FileDisplay/Columns';
import FileDisplay from '../../../../components/FileDisplay/FileDisplay';
import Breadcrumbs from '../../../Files/subcomponents/Breadcrumbs/Breadcrumbs';
import { gitStage, gitUnstage } from '../../../../ipc';

interface Props {
  item: GitRepoTreeItem;
}

const ChangedFile: React.FC<Props> = ({ item }) => (
  <Box>
    <Header
      nameSubstitute={<Breadcrumbs dirPath={removeFilename(item.filepath)} />}
    />

    <Box sx={{ display: 'flex' }}>
      {isStaged(item.status) && (
        <IconButton
          color='primary'
          size='small'
          onClick={() => {
            gitUnstage(item);
          }}
        >
          <ClearIcon fontSize='inherit' />
        </IconButton>
      )}
      {!isFullyStaged(item.status) && (
        <IconButton
          color='primary'
          size='small'
          onClick={() => {
            gitStage(item);
          }}
        >
          <AddIcon fontSize='inherit' />
        </IconButton>
      )}
      <Box
        sx={{
          backgroundColor: isStaged(item.status) ? '#fff' : 'transparent',
          flexGrow: '1',
        }}
      >
        <FileDisplay item={item} />
      </Box>
    </Box>
  </Box>
);

export default ChangedFile;

function removeFilename(filepath: string) {
  const split = filepath.split('/');
  split.pop();
  return split.join(path.sep);
}
