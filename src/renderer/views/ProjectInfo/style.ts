import { styled } from '@mui/material';
import CButton from '../../components/CloseButton/CloseButton';
import SectionBase from '../../components/Section/Section';

export const CloseButton = styled(CButton)({
  position: 'absolute',
  right: 0,
});

export const Section = styled(SectionBase)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.text.primary}`,
  margin: `${theme.spacing(2)} 0`,
  '&:last-of-type': {
    border: 'none',
  },
}));
