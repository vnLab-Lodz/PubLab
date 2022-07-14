import { styled, TextField } from '@mui/material';

export const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root.MuiInputBase-root': {
    position: 'relative',
    borderRadius: '1.5rem 1.5rem',
    minHeight: '3rem',
    minWidth: '12rem',
    padding: `0 ${theme.spacing(1)}`,
    border: '1px solid transparent',
    '& *': {
      color: theme.palette.text.primary,
    },
    '& .search-icon': {
      position: 'absolute',
      right: '0.5rem',
      padding: '10rem 0 10rem 0.5rem',
    },
    '& .MuiInputBase-input': {
      marginRight: '2rem',
      padding: 0,
      height: '3rem',
    },
    '& .MuiOutlinedInput-notchedOutline ': {
      border: 'none',
      padding: 0,
    },
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.paleGreen.main,
      border: '1px solid',
      '& *': {
        color: theme.palette.paleGreen.contrastText,
      },
      '& .search-icon': {
        borderLeft: '1px solid',
      },
    },
  },
  fontSize: '1.2rem',
}));
