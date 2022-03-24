import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import StyledSwitch from '../../../../components/Switch/Switch';
import {
  newPublication,
  setPublicationField,
} from '../../../../../shared/redux/slices/addPublicationWizardSlice';

const TechnologiesPicker = () => {
  const { t } = useTranslation();
  const { useSass, useTypescript } = useSelector(newPublication);
  const dispatch = useDispatch();

  const toggleSass = () => {
    dispatch(setPublicationField({ field: 'useSass', value: !useSass }));
  };

  const toggleTypescript = () => {
    dispatch(
      setPublicationField({ field: 'useTypescript', value: !useTypescript })
    );
  };

  return (
    <Box>
      <Typography variant='subtitle1' component='p' mb={3}>
        {t('technology-picker.message')}
      </Typography>

      <Box>
        <Box mb={2}>
          <StyledSwitch size='small' checked={useSass} onChange={toggleSass} />
          <Typography variant='body2' ml={1}>
            SCSS
          </Typography>
        </Box>
        <Box>
          <StyledSwitch
            size='small'
            checked={useTypescript}
            onChange={toggleTypescript}
          />
          <Typography variant='body2' ml={1}>
            TYPESCRIPT
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnologiesPicker;
