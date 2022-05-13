import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

const Section: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Box my={4} component='section' {...rest}>
    {children}
  </Box>
);

export default Section;

export const SeparatedSection = styled(Section)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.gray.main}`,
  margin: `${theme.spacing(3)} 0`,
  '&:last-of-type': {
    border: 'none',
  },
}));
