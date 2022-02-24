import React from 'react';
import { Box, BoxProps } from '@mui/material';

const Section: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Box my={4} component='section' {...rest}>
    {children}
  </Box>
);

export default Section;
