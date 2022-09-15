import React from 'react';
import { LocalPublication } from 'src/shared/types';
import 'xterm/css/xterm.css';
import { Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Output from './components/Output/Output';
import * as Styled from './style';
import Toolbar from './components/Toolbar/Toolbar';

type Props = {
  project: LocalPublication;
};

const Terminal: React.FC<Props> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant='caption'
        component='h2'
        mb={2}
        textTransform='uppercase'
      >
        {t('Terminal.project_server')}:
      </Typography>
      <Typography variant='caption' component='p' mb={2}>
        <Info fontSize='inherit' /> {t('Terminal.info')}
      </Typography>
      <Styled.TerminalContainer
        aria-label={t('Terminal.project_server')}
        component='section'
      >
        <Toolbar project={project} />
        <Output />
      </Styled.TerminalContainer>
    </>
  );
};

export default React.memo(Terminal);
