import { Box, Button, styled } from '@mui/material';

const buttonWidth = 2.5;
const subviewWidth = 30;

export const Panel = styled(Box)<{ isExpanded?: boolean }>(
  ({ theme, isExpanded }) => {
    const width = `${subviewWidth + buttonWidth}rem`;

    return {
      position: 'relative',
      display: 'flex',
      minWidth: isExpanded ? width : `${buttonWidth}rem`,
      maxWidth: isExpanded ? width : `${buttonWidth}rem`,
      background: theme.palette.primary.main,
      transition: 'all 0.3s',
    };
  }
);

export const PanelButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>(({ theme }) => ({
  boxSizing: 'border-box',
  padding: 0,
  width: `${buttonWidth}rem`,
  minWidth: `${buttonWidth}rem`,
  borderLeft: theme.palette.text.secondary,
  color: theme.palette.text.secondary,
  '&&&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

export const SubviewBox = styled(Box)<{ isExpanded?: boolean }>(
  ({ isExpanded }) => ({
    width: isExpanded ? `${subviewWidth}rem` : 0,
    transition: 'all 0.3s',
  })
);
