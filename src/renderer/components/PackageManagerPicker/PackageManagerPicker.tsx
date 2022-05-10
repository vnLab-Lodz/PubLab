import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication, PublicationBase } from 'src/shared/types';
import RadioBtn from '../RadioButton/RadioBtn';

type State = Pick<Publication, 'packageManager'>;

interface Props {
  onSubmit: (state: State) => void;
  state: State;
}

const PackageManagerPicker = ({ onSubmit, state }: Props) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as PublicationBase['packageManager'];
    onSubmit({ ...state, packageManager: value });
  };

  return (
    <Box>
      <Typography variant='subtitle1' component='p' mb={3}>
        {t('AddProject.PackageManager.message')}
      </Typography>

      <Box mb={2}>
        <RadioGroup defaultValue={state.packageManager} onChange={handleChange}>
          <FormControlLabel
            value='npm'
            control={<RadioBtn />}
            label={<Typography variant='body2'>NPM</Typography>}
          />
          <FormControlLabel
            disabled
            value='yarn'
            control={<RadioBtn />}
            label={<Typography variant='body2'>YARN</Typography>}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default PackageManagerPicker;