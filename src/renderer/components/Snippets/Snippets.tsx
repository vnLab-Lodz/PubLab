import { Typography, Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Snippet from './Snippet';
import { PlainUl } from '../List/List';
import { Publication } from '../../../shared/types';
import * as Styled from './style';

interface Props {
  project: Publication;
  noLabel?: boolean;
  isAccordion?: boolean;
}

const Snippets = ({ project, noLabel, isAccordion }: Props) => {
  const { t } = useTranslation();
  const snippets = project.snippets || [];

  return (
    <Box mt={0} mb={2}>
      {!noLabel && (
        <Typography variant='caption' component='h2' mb={2}>
          {t('publication.snippets').toLocaleUpperCase()}:
        </Typography>
      )}
      <PlainUl>
        {snippets.map((snippet, index) => (
          <Styled.Li key={snippet.id} isAccordion={!!isAccordion}>
            {isAccordion ? (
              <Snippet.Accordion snippet={snippet} index={index} />
            ) : (
              <Snippet.Plain snippet={snippet} />
            )}
          </Styled.Li>
        ))}
      </PlainUl>
    </Box>
  );
};

Snippets.defaultProps = {
  noLabel: false,
  isAccordion: false,
};

export default Snippets;
