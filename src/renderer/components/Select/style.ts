import { styled, Select as MuiSelect, alpha } from '@mui/material';

export const Select = styled(MuiSelect)(({ theme }) => ({
  borderRadius: 0,
  ':hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  '&&& .MuiSelect-select': {
    padding: 0,
    paddingRight: '48px',
    '& > *': {
      lineHeight: '1.5em',
      padding: '1em 0 0.6em 0.6em',
    },
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