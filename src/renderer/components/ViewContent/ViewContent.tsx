import { BoxProps } from '@mui/material';
import React from 'react';
import { BackgroundWrapper, MainContentBox, SubviewContentBox } from './style';

interface Props extends BoxProps {
  isSubview?: boolean;
  contentBoxProps?: BoxProps;
}

const ViewContent: React.FC<Props> = ({
  children,
  contentBoxProps,
  isSubview,
  ...rest
}) => {
  const ContentBox = isSubview ? SubviewContentBox : MainContentBox;
  return (
    <BackgroundWrapper {...rest}>
      <ContentBox className='view-content' {...contentBoxProps}>
        {children}
      </ContentBox>
    </BackgroundWrapper>
  );
};

ViewContent.defaultProps = { contentBoxProps: {}, isSubview: false };

export default ViewContent;
