import { BoxProps } from '@mui/material';
import React from 'react';
import SubviewPanel from '../SubviewPanel/SubviewPanel';
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
  const Panel = isSubview ? SubviewPanel : React.Fragment;
  return (
    <Panel>
      <BackgroundWrapper {...rest}>
        <ContentBox className='view-content' {...contentBoxProps}>
          {children}
        </ContentBox>
      </BackgroundWrapper>
    </Panel>
  );
};

ViewContent.defaultProps = { contentBoxProps: {}, isSubview: false };

export default ViewContent;
