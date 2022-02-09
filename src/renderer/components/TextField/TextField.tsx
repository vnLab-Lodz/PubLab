import { InputBase } from '@mui/material';
import './TextField.scss';
import { styled } from '@mui/material/styles';

export default styled(InputBase)(({ error, theme: { palette } }) => {
  let color = palette.primary.main;
  if (error) color = palette.error.main;

  const border = `1px solid ${color}`;

  return {
    color,
    border,
    padding: 0,
    '& .MuiInputBase-input': {
      lineHeight: '1.4em',
      padding: '1em 0.6em',
    },
  };
});
