import { IconButton, styled } from '@mui/material';

const StageButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 0,
  margin: 0,
  marginRight: 'auto',
  width: '3rem',
  height: '3rem',
}));

StageButton.defaultProps = {
  color: 'primary',
  size: 'small',
};

export default StageButton;
