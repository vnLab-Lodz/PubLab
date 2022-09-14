import React from 'react';
import { LocalPublication } from 'src/shared/types';
import 'xterm/css/xterm.css';
import Output from './components/Output/Output';
import * as Styled from './style';
import Toolbar from './components/Toolbar/Toolbar';

type Props = {
  project: LocalPublication;
};

const Terminal: React.FC<Props> = ({ project }) => (
  <Styled.TerminalContainer aria-label='Development server' component='section'>
    <Toolbar project={project} />
    <Output />
  </Styled.TerminalContainer>
);

export default React.memo(Terminal);
