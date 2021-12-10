import {
  TableCell,
  styled,
  TableCellProps,
  TableRow,
  TableContainer,
} from '@mui/material';

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
  height: 15px;
  overflow: hidden;
`;

export const BorderedTC = styled(TableCell)<InnerProps>`
  &.MuiTableCell-root {
    text-align: ${(props) => (props.align ? props.align : 'left')};
    border: ${(props) =>
      props.border ? `2px solid ${props.theme.palette.text.primary}` : 'none'};
    border-left: ${(props) => props.usernameColumn && 'none'};
    width: ${(props) => props.width};
    overflow: hidden;
    padding: 5px;
    cursor: pointer;
  }
`;
