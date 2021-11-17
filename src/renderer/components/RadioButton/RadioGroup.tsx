import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';
// import { Box } from '@mui/';
import { theme } from '../../theme';

interface Props {
  disabled1?: boolean;
  disabled2?: boolean;
  defaults?: string;
}

const RadioBtn = styled(Radio)(() => ({
  color: theme.palette.lightGray.main,
  '&.Mui-checked': {
    color: theme.palette.lightGray.main,
  },
}));

const OurRadio: React.FC<Props> = ({ disabled1, disabled2, defaults }) => (
  <FormControl component='fieldset'>
    {/* <Box pb={4} pt={2}>
      <FormLabel component='legend'>
        <Typography variant='h4' color='text.primary'>
          {' '}
          Choose the Package Manager:
        </Typography>
      </FormLabel>
    </Box> */}
    <RadioGroup defaultValue={defaults} name='customized-radios'>
      <FormControlLabel
        disabled={disabled1}
        value='yarn'
        control={<RadioBtn />}
        label={
          <Typography variant='h5' color='default'>
            YARN
          </Typography>
        }
      />
      <FormControlLabel
        disabled={disabled2}
        value='npm'
        control={<RadioBtn s />}
        label={
          <Typography variant='h5' color='default'>
            NPM
          </Typography>
        }
      />
    </RadioGroup>
  </FormControl>
);

OurRadio.defaultProps = {
  disabled1: false,
  disabled2: false,
  defaults: 'npm',
};

export default OurRadio;
