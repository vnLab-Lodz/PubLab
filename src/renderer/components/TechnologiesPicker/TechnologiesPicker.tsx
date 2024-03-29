import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddPublicationWizard } from 'src/shared/redux/slices/addPublicationWizardSlice';
import StyledSwitch from '../Switch/Switch';
import Tooltip from '../Tooltip/Tooltip';

type State = Pick<
  AddPublicationWizard['data'],
  'useSass' | 'useTypescript' | 'multilingual'
>;

interface Props {
  onSubmit: (state: State) => void;
  state: State;
}

const TechnologiesPicker = ({ onSubmit, state }: Props) => {
  const { t } = useTranslation();

  const sassTooltip = state.multilingual
    ? t('technology-picker.sass-tooltip')
    : '';

  const sassLabelColor = state.multilingual ? 'gray.dark' : undefined;

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
          <Tooltip title={sassTooltip} arrow placement='right-start'>
            <span>
              <StyledSwitch
                size='small'
                checked={state.multilingual || state.useSass}
                onChange={toggleSass}
                disabled={state.multilingual}
              />
              <Typography variant='body2' ml={1} color={sassLabelColor}>
                SCSS
              </Typography>
            </span>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            title={t('technology-picker.ts-tooltip')}
            arrow
            placement='right-start'
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
