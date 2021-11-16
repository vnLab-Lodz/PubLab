import { InputBase } from '@mui/material';
import './TextField.scss';
import { styled } from '@mui/material/styles';

export default styled(InputBase)(({ type, error, theme: { palette } }) => {
  const { lightGray, black, lightRed } = palette;

  let color = type === 'light' ? black.main : lightGray.main;
  if (error) color = lightRed.main;

  const border = `1px solid ${color}`;

  return {
    color,
    border,
    padding: '12px 10px 12px 10px',
    fontSize: '15px !important',
  };
});
