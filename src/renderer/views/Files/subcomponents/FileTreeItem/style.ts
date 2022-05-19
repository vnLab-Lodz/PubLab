import { TreeItem as TreeItemBase } from '@mui/lab';
import { styled } from '@mui/material';

export const TreeItem = styled(TreeItemBase, {
  shouldForwardProp: (prop) => prop !== 'treeLevel',
})<{ treeLevel: number }>(({ treeLevel }) => ({
  '& .MuiTreeItem-content': {
    padding: 0,
  },
  '&& .MuiTreeItem-label': {
    padding: 0,
  },
  '& .MuiCollapse-root': {
    marginLeft: 0,
    overflow: 'hidden',
    '&:not(.MuiCollapse-entered) .MuiTreeItem-iconContainer': {
      opacity: 0,
      transition: 'opacity 0.2s',
    },
  },
  '& .MuiTreeItem-iconContainer': {
    position: 'absolute',
    left: `${treeLevel * 2 - 1.5}rem`,
  },
}));
