import { styled } from '@mui/material';
import SectionBase from '../../components/Section/Section';

export const Section = styled(SectionBase)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.gray.main}`,
  margin: `${theme.spacing(3)} 0`,
}));
