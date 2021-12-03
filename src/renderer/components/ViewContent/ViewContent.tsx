import { BoxProps } from '@mui/material';
import React from 'react';
import { BackgroundWrapper, ContentBox } from './style';

const ViewContent: React.FC<BoxProps> = ({ children, ...rest }) => (
  <BackgroundWrapper {...rest}>
    <ContentBox className='view-content'>{children}</ContentBox>
  </BackgroundWrapper>
);

export default ViewContent;
