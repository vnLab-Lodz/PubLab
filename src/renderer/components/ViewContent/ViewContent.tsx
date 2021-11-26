import { BoxProps } from '@mui/material';
import React from 'react';
import { BackgroundWrapper, ContentBox } from './style';

const ViewContent: React.FC<BoxProps> = (props) => (
  <BackgroundWrapper {...props}>
    <ContentBox>{props.children}</ContentBox>
  </BackgroundWrapper>
);

export default ViewContent;
