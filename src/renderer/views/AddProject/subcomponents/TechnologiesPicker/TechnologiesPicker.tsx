import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../../../shared/types';
import StyledSwitch from '../../../../components/Switch/Switch';

type State = Pick<Publication, 'useSass' | 'useTypescript'>;

interface Props {
  onSubmit: (state: State) => void;
  state: State;
}

const TechnologiesPicker = ({ onSubmit, state }: Props) => {
  const { t } = useTranslation();

  const toggleSass = () => {
    onSubmit({ ...state, useSass: !state.useSass });
  };
  const toggleTypescript = () => {
    onSubmit({ ...state, useTypescript: !state.useTypescript });
  };

  return (
    <Box>
      <Typography variant='subtitle1' component='p' mb={3}>
        {t('technology-picker.message')}
      </Typography>

      <Box>
        <Box mb={2}>
          <StyledSwitch
            size='small'
            checked={state.useSass}
            onChange={toggleSass}
          />
          <Typography variant='body2' ml={1}>
            SCSS
          </Typography>
        </Box>
        <Box>
          <StyledSwitch
            size='small'
            checked={state.useTypescript}
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
