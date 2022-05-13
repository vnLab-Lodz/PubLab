import { styled, TableRow, TableContainer } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const Container = styled(TableContainer)`
  overflow: hidden;
`;

export const Row = styled(TableRow)`
  height: 3rem;
  line-height: 3rem;
  overflow: hidden;
`;

export const Icon = styled(ClearIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;
