import { Box, BoxProps, styled } from '@mui/material';

interface Props extends BoxProps {
  singular?: boolean;
}

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'singular',
  name: 'WrapperBox',
  slot: 'Root',
})<Props>(({ singular }) => ({
  display: 'grid',
  gridTemplateColumns: singular ? '1fr' : 'auto 1fr auto',
  minHeight: '100vh',
  boxSizing: 'border-box',

  '> *': {
    height: '100%',
    boxSizing: 'border-box',
  },
}));
