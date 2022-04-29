import { ArrowRight } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { clipboard } from 'electron';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Snippet } from '../../../shared/types';
import * as Styled from './style';

const Plain = ({
  snippet,
  biggerText = false,
}: {
  snippet: Snippet;
  biggerText?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        sx={{ display: 'inline-block' }}
        variant={biggerText ? 'subtitle1' : 'body1'}
      >
        {snippet.name}
      </Typography>
      <Styled.CopyButton
        biggerText
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          clipboard.writeText(snippet.code);
        }}
      >
        <Typography variant='caption'>{t('common.copy')}</Typography>
      </Styled.CopyButton>
    </>
  );
};

Plain.defaultProps = {
  biggerText: false,
};

const Accordion = ({ snippet, index }: { snippet: Snippet; index: number }) => {
  const id = `snippet${index}-${snippet.name}`;

  return (
    <Styled.Accordion disableGutters>
      <Styled.AccordionSummary
        expandIcon={<ArrowRight />}
        id={`${id}-header`}
        aria-controls={`${id}-content`}
      >
        <Plain snippet={snippet} biggerText />
      </Styled.AccordionSummary>
      <Styled.AccordionDetails>
        <Typography>{snippet.code}</Typography>
      </Styled.AccordionDetails>
    </Styled.Accordion>
  );
};

export { Plain, Accordion };
