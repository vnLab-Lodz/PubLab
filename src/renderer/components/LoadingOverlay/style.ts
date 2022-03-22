import { styled } from '@mui/material';

export const Overlay = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => `${theme.palette.pink.main}7F`};
  display: flex;
  color: ${({ theme }) => theme.palette.text.primary};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
