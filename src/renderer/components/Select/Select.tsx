import React, { useCallback } from 'react';
import { MenuItem, MenuProps, SelectProps } from '@mui/material';
import * as Styled from './style';

type Props = { placeholder?: string } & SelectProps<any>;

const menuProps: Partial<MenuProps> = {
  MenuListProps: { sx: Styled.MenuListSx },
  PaperProps: { sx: Styled.MenuPaperSx },
};

const Select: React.FC<Props> = (props) => {
  const { placeholder, children, value, ...rest } = props;

  const getValue = useCallback(() => {
    if (value) return value;

    return placeholder ? 'placeholder' : '';
  }, [value, placeholder]);

  return (
    <Styled.Select MenuProps={menuProps} {...rest} value={getValue()}>
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
