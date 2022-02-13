import {
  TableCell,
  styled,
  TableCellProps,
  TableRow,
  TableContainer,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface AddedProps {
  border?: boolean;
  usernameColumn?: boolean;
  align?: string;
  width?: string;
}

type InnerProps = AddedProps & TableCellProps;

export const Container = styled(TableContainer)`
  overflow: hidden;
`;

export const Row = styled(TableRow)`
  height: 3rem;
  line-height: 3rem;
  overflow: hidden;
`;

export const BorderedTC = styled(TableCell, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== 'border' && prop !== 'usernameColumn',
  name: 'BorderedTC',
  slot: 'Root',
})<InnerProps>`
  &.MuiTableCell-root {
    text-align: ${(props) => props.align ?? 'left'};
    border: ${(props) =>
      props.border
        ? `0.2rem solid ${props.theme.palette.text.primary}`
        : 'none'};
    border-left: ${(props) => props.usernameColumn && 'none'};
    width: ${(props) => props.width};
    overflow: hidden;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

export const Icon = styled(ClearIcon)`
  width: 1.5rem
  height: 1.5rem;
`;
