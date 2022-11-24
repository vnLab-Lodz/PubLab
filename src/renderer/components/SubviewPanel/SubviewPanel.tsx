import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as Styled from './style';

interface Props {
  children: React.ReactNode;
}

const SubviewPanel: React.FC<Props> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return (
    <Styled.Panel isExpanded={isExpanded} component='aside' className='subview'>
      <Styled.PanelButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Styled.PanelButton>
      <Styled.SubviewBox>{children}</Styled.SubviewBox>
    </Styled.Panel>
  );
};

export default SubviewPanel;
