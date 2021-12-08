import { InputBase } from '@mui/material';
import './TextField.scss';
import { styled } from '@mui/material/styles';

export default styled(InputBase)(({ error, theme: { palette } }) => {
  const { primary, lightRed } = palette;

  let color = primary.main;
  if (error) color = lightRed.main;

  const border = `1px solid ${color}`;

  return {
    color,
    border,
    padding: 0,
    '& .MuiInputBase-input': {
      lineHeight: '1.4em',
      padding: '1em 0 0.6em 0.6em',
    },
  };
});
