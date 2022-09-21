import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../shared/types';
import StyledSwitch from '../Switch/Switch';
import Tooltip from '../Tooltip/Tooltip';

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
          <Tooltip
            title={t('technology-picker.ts-tooltip')}
            arrow
            placement='top-start'
          >
            <span>
              <StyledSwitch
                size='small'
                checked={state.useTypescript}
                onChange={toggleTypescript}
                disabled
              />
              <Typography variant='body2' ml={1} color='gray.dark'>
                TYPESCRIPT
              </Typography>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnologiesPicker;
