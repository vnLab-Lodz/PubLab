import {
  styled,
  Select as MuiSelect,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';

export const Select = styled(MuiSelect)(({ theme }) => ({
  borderRadius: 0,
  ':hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  '&&& .MuiSelect-select': {
    padding: '1.5rem 0',
    paddingRight: '4.8rem',
  },

  '&&& .MuiOutlinedInput-input': {
    paddingLeft: '0.6em',
  },

  '& .MuiOutlinedInput-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.text.disabled,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
    borderColor: theme.palette.primary.main,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.disabled,
  },

  '& .MuiSelect-icon': {
    fill: theme.palette.primary.main,
  },
  '&.Mui-disabled .MuiSelect-icon': {
    fill: theme.palette.text.disabled,
  },
}));

export const MenuListSx: SxProps<Theme> = {
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
};

export const MenuPaperSx: SxProps = {
  borderRadius: 0,
  boxShadow: 'none',
};
