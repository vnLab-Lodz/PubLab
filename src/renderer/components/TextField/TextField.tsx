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
    padding: '12px 10px 12px 10px',
  };
});
