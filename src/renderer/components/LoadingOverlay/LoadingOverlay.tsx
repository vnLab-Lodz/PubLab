import { CircularProgress } from '@mui/material';
import React from 'react';
import * as Styled from './style';

interface Props {
  position?: 'fixed' | 'absolute';
}

const LoadingOverlay: React.FC<Props> = ({ children, position }) => (
  <Styled.Overlay style={{ position }}>
    <CircularProgress
      size={60}
      sx={(theme) => ({
        color: theme.palette.green.main,
      })}
    />
    {children}
  </Styled.Overlay>
);

LoadingOverlay.defaultProps = {
  position: 'fixed',
};

export default LoadingOverlay;
