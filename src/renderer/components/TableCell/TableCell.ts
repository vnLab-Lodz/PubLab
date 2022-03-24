import {
  styled,
  TableCell as MUITableCell,
  TableCellProps,
} from '@mui/material';

interface AddedProps {
  border?: boolean;
  align?: string;
  width?: string;
}

type InnerProps = AddedProps & TableCellProps;

const TableCell = styled(MUITableCell, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== 'border' && prop !== 'usernameColumn',
})<InnerProps>`
  text-align: ${(props) => props.align ?? 'left'};
  border: ${(props) =>
    props.border ? `1px solid ${props.theme.palette.text.primary}` : 'none'};
  border-left: none;
  width: ${(props) => props.width};
  overflow: hidden;
  padding: 0.5rem;
`;

export default TableCell;
