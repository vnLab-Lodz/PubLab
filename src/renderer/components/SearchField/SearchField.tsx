/* eslint-disable react/prop-types */
import { InputAdornment } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import * as Styled from './style';

type Props = React.ComponentProps<typeof Styled.SearchField>;

const SearchField: React.FC<Props> = (props: Props) => (
  <Styled.SearchField
    {...props}
    size='small'
    InputProps={{
      ...props.InputProps,
      endAdornment: (
        <>
          {props.InputProps?.endAdornment}
          <InputAdornment position='end' className='search-icon'>
            <SearchIcon fontSize='small' />
          </InputAdornment>
        </>
      ),
    }}
  />
);

export default SearchField;
