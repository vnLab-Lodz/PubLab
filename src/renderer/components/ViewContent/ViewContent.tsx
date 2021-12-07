import { BoxProps } from '@mui/material';
import React from 'react';
import { BackgroundWrapper, ContentBox } from './style';

interface Props extends BoxProps {
  contentBoxProps?: BoxProps;
}

const ViewContent: React.FC<Props> = ({
  children,
  contentBoxProps,
  ...rest
}) => (
  <BackgroundWrapper {...rest}>
    <ContentBox className='view-content' {...contentBoxProps}>
      {children}
    </ContentBox>
  </BackgroundWrapper>
);

ViewContent.defaultProps = { contentBoxProps: {} };

export default ViewContent;
