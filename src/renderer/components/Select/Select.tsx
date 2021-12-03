import React, { useCallback } from 'react';
import { alpha, MenuItem, MenuProps, SelectProps } from '@mui/material';
import * as Styled from './style';

const menuListProps: Partial<MenuProps> = {
  MenuListProps: {
    sx: {
      bgcolor: (theme) => theme.palette.primary.main,
      '& .MuiMenuItem-root': {
        color: (theme) => theme.palette.primary.contrastText,
        ':hover': {
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
        },
        '&.Mui-selected.Mui-selected': {
          bgcolor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        },
      },
    },
  },
  PaperProps: { sx: { borderRadius: 0, boxShadow: 'none' } },
};

type Props = { placeholder?: string } & SelectProps<any>;

const Select: React.FC<Props> = (props) => {
  const { placeholder, children, value, ...rest } = props;

  const getValue = useCallback(() => {
    if (value) return value;

    return placeholder ? 'placeholder' : '';
  }, [value, placeholder]);

  return (
    <Styled.Select MenuProps={menuListProps} {...rest} value={getValue()}>
      {placeholder && (
        <MenuItem disabled value='placeholder'>
          {placeholder}
        </MenuItem>
      )}
      {children}
    </Styled.Select>
  );
};

Select.defaultProps = {
  placeholder: '',
};

export default Select;
