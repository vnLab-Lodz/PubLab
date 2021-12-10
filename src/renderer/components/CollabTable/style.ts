import { TableCell, styled, TableCellProps } from '@mui/material';

interface AddedProps {
  border?: boolean;
  usernameColumn?: boolean;
}

type InnerProps = AddedProps & TableCellProps;

export const BorderedTC = styled(TableCell)<InnerProps>`
  &.MuiTableCell-root {
    border: ${(props) =>
      props.border ? `2px solid ${props.theme.palette.text.primary}` : 'none'};
    font-weight: bold;
  }
`;
