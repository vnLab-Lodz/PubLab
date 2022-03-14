import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  NewPublication,
  newPublication,
  setPublicationField,
} from '../../../../../shared/redux/slices/addPublicationSlice';
import RadioBtn from '../../../../components/RadioButton/RadioBtn';

const PackageManagerPicker = () => {
  const { t } = useTranslation();
  const { packageManager } = useSelector(newPublication);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as NewPublication['packageManager'];
    dispatch(setPublicationField({ field: 'packageManager', value }));
  };

  return (
    <Box>
      <Typography variant='subtitle1' component='p' mb={3}>
        {t('AddProject.PackageManager.message')}
      </Typography>

      <Box mb={2}>
        <RadioGroup defaultValue={packageManager} onChange={handleChange}>
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
