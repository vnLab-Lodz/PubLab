import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
  AccordionDetails as MUIAccordionDetails,
  styled,
} from '@mui/material';

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
