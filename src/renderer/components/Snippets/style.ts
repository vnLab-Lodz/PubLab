import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
  AccordionDetails as MUIAccordionDetails,
  Button,
  styled,
} from '@mui/material';

export const CopyButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'biggerText',
})<{ biggerText?: boolean }>(({ theme, biggerText }) => ({
  textTransform: 'lowercase',
  fontWeight: 700,
  marginLeft: theme.spacing(2),
  height: biggerText
    ? theme.typography.subtitle1.lineHeight
    : theme.typography.body1.lineHeight,
}));

export const Accordion = styled(MUIAccordion)({
  background: 'transparent',
  boxShadow: 'none',
  '&::before': {
    display: 'none',
  },
});

export const AccordionSummary = styled(MUIAccordionSummary)({
  padding: '0',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

export const AccordionDetails = styled(MUIAccordionDetails)(({ theme }) => ({
  border: '1px solid',
  overflowX: 'auto',
  whiteSpace: 'pre',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

export const Li = styled('li', {
  shouldForwardProp: (prop) => prop !== 'isAccordion',
})<{ isAccordion: boolean }>(({ theme, isAccordion }) =>
  isAccordion
    ? {}
    : {
        display: 'flex',
        alignContent: 'start',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.gray.dark}`,
        padding: `${theme.spacing(1)} 0`,
      }
);
