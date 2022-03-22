import { CircularProgress } from '@mui/material';
import React from 'react';
import * as Styled from './style';

const LoadingOverlay: React.FC = ({ children }) => (
  <Styled.Overlay>
    <CircularProgress
      size={60}
      sx={(theme) => ({
        color: theme.palette.green.main,
      })}
    />
    {children}
  </Styled.Overlay>
);

export default LoadingOverlay;
