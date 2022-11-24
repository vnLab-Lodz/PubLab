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
      overflow: 'hidden',
      background: theme.palette.background.default,
      transition: 'all 0.3s',
    };
  }
);

export const PanelButton = styled(Button)({
  boxSizing: 'border-box',
  padding: 0,
  width: `${buttonWidth}rem`,
  minWidth: `${buttonWidth}rem`,
  '&&&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
});

export const SubviewBox = styled(Box)({
  width: `${subviewWidth}rem`,
  flexShrink: 0,
});
