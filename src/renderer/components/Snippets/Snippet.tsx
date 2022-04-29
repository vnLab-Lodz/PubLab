import { ArrowRight } from '@mui/icons-material';
import { Typography, Button } from '@mui/material';
import { clipboard } from 'electron';
import React from 'react';
import { Snippet } from '../../../shared/types';
import * as Styled from './style';

export const Plain = ({ snippet }: { snippet: Snippet }) => (
  <>
    <Typography variant='subtitle1'>{snippet.name}</Typography>
    <Button
      sx={{ textTransform: 'lowercase', fontWeight: 700 }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        clipboard.writeText(snippet.code);
      }}
    >
      <Typography variant='caption'>Copy</Typography>
    </Button>
  </>
);

export const Accordion = ({
  snippet,
  index,
}: {
  snippet: Snippet;
  index: number;
}) => {
  const id = `snippet${index}-${snippet.name}`;

  return (
    <Styled.Accordion disableGutters>
      <Styled.AccordionSummary
        expandIcon={<ArrowRight />}
        id={`${id}-header`}
        aria-controls={`${id}-content`}
      >
        <Plain snippet={snippet} />
      </Styled.AccordionSummary>
      <Styled.AccordionDetails>
        <Typography>{snippet.code}</Typography>
      </Styled.AccordionDetails>
    </Styled.Accordion>
  );
};
