import React, { useCallback } from 'react';
import {
  MenuItem,
  styled,
  MenuProps,
  SelectProps,
  Select as MuiSelect,
} from '@mui/material';

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  borderRadius: 0,

  '& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input':
    {
      paddingRight: '48px',
    },

  '& .MuiOutlinedInput-input.MuiInputBase-input.Mui-disabled': {
    '-webkit-text-fill-color': theme.palette.darkGray.main,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
    borderColor: theme.palette.lightGray.main,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.lightGray.main,
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.darkGray.main,
  },

  '& .MuiSelect-icon': {
    fill: theme.palette.lightGray.main,
  },
  '&.Mui-disabled .MuiSelect-icon': {
    fill: theme.palette.darkGray.main,
  },
}));

const menuListProps: Partial<MenuProps> = {
  MenuListProps: {
    sx: {
      bgcolor: (theme) => theme.palette.lightGray.main,
      '& .MuiMenuItem-root': {
        color: (theme) => theme.palette.black.main,
        '&.Mui-selected, &.Mui-selected:hover': {
          bgcolor: (theme) => theme.palette.gray.main,
        },
      },
    },
  },
  PaperProps: { sx: { borderRadius: 0 } },
};

type Props = { placeholder?: string } & SelectProps<any>;

const Select: React.FC<Props> = (props) => {
  const { placeholder, children, value, ...rest } = props;

  const getValue = useCallback(() => {
    if (value) return value;

    return placeholder ? 'placeholder' : '';
  }, [value, placeholder]);

  return (
    <StyledSelect MenuProps={menuListProps} {...rest} value={getValue()}>
      {placeholder && (
        <MenuItem disabled value='placeholder'>
          {placeholder}
        </MenuItem>
      )}
      {children}
    </StyledSelect>
  );
};

Select.defaultProps = {
  placeholder: '',
};

export default Select;
