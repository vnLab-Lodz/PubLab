import { Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { GitRepoTreeItem } from '../../../../../shared/types/api';
import {
  isFullyStaged,
  isStaged,
} from '../../../../../shared/utils/repoStatus/statusChecks';
import { Header } from '../../../../components/FileDisplay/Columns';
import FileDisplay from '../../../../components/FileDisplay/FileDisplay';
import { gitStage, gitUnstage } from '../../../../ipc';
import StageButton from './StageButton';

interface Props {
  item: GitRepoTreeItem;
  noButton?: boolean;
}

const ChangedFile: React.FC<Props> = ({ item, noButton }) => (
  <Box>
    <Box sx={{ display: 'flex' }}>
      {!noButton && (
        <Box
          mr={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {isStaged(item.status) && (
            <StageButton
              onClick={() => {
                gitUnstage(item);
              }}
            >
              <ClearIcon fontSize='inherit' />
            </StageButton>
          )}
          {!isFullyStaged(item.status) && (
            <StageButton
              onClick={() => {
                gitStage(item);
              }}
            >
              <AddIcon fontSize='inherit' />
            </StageButton>
          )}
        </Box>
      )}
      <Box sx={{ flexGrow: '1' }}>
        <Header
          nameSubstitute={
            <Typography variant='body2'>{formatPath(item.filepath)}</Typography>
          }
        />
        <Box
          sx={{
            backgroundColor: isStaged(item.status) ? '#fff' : 'transparent',
          }}
        >
          <FileDisplay item={item} treeLevel={1} />
        </Box>
      </Box>
    </Box>
  </Box>
);

ChangedFile.defaultProps = {
  noButton: false,
};

export default ChangedFile;

function formatPath(filepath: string) {
  const split = filepath.split('/');
  split[split.length - 1] = '';
  return ['. / ', ...split.join(' / ')];
}
