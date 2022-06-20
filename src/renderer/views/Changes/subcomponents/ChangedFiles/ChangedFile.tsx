import { Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { GitRepoTreeItem } from '../../../../../shared/types/api';
import {
  isFullyStaged,
  isStaged,
} from '../../../../../shared/utils/repoStatus/statusChecks';
import FileDisplay from '../../../../components/FileDisplay/FileDisplay';
import { gitStage, gitUnstage } from '../../../../ipc';
import StageButton from './StageButton';

interface Props {
  item: GitRepoTreeItem;
  noButton?: boolean;
}

const ChangedFile: React.FC<Props> = ({ item, noButton }) => (
  <Box my={1} sx={{ display: 'flex' }}>
    {!noButton && (
      <Box
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: spacing(3),
        })}
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
      <Box
        sx={{
          backgroundColor: isStaged(item.status) ? '#fff' : 'transparent',
        }}
      >
        <FileDisplay item={item} treeLevel={1} />
      </Box>
    </Box>
  </Box>
);

ChangedFile.defaultProps = {
  noButton: false,
};

export default ChangedFile;
