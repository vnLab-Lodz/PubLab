import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import StyledSwitch from '../../../../components/Switch/Switch';
import {
  newPublication,
  setPublicationField,
} from '../../../../../shared/redux/slices/addPublicationSlice';

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
      <Typography variant='h1' sx={{ marginBottom: '4.5rem' }}>
        {t('technology-picker.message')}
      </Typography>

      <Box>
        <Box sx={{ marginBottom: '2.5rem' }}>
          <StyledSwitch size='small' checked={useSass} onChange={toggleSass} />
          <Typography
            variant='h4'
            sx={{ display: 'inline', marginLeft: '1rem' }}
          >
            SCSS
          </Typography>
        </Box>
        <Box>
          <StyledSwitch
            size='small'
            checked={useTypescript}
            onChange={toggleTypescript}
          />
          <Typography
            variant='h4'
            sx={{ display: 'inline', marginLeft: '1rem' }}
          >
            TYPESCRIPT
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnologiesPicker;
