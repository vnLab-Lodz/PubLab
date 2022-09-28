import { Box, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddPublicationWizard } from 'src/shared/redux/slices/addPublicationWizardSlice';
import RadioBtn, { RadioFormControl } from '../RadioButton/RadioBtn';

type State = Pick<AddPublicationWizard['data'], 'multilingual'>;

interface Props {
  onSubmit: (state: State) => void;
  state: State;
}

const LanguagesPicker = ({ onSubmit, state }: Props) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'multi';
    onSubmit({ ...state, multilingual: value });
  };

  const value = state.multilingual ? 'multi' : 'single';

  return (
    <Box>
      <Typography variant='subtitle1' component='p' mb={3}>
        {t('AddProject.LanguagesPicker.message')}
      </Typography>

      <Box mb={2}>
        <RadioGroup value={value} onChange={handleChange}>
          <RadioFormControl
            value='single'
            control={<RadioBtn />}
            label={
              <Typography
                variant='body2'
                style={{ textTransform: 'uppercase' }}
              >
                {t('AddProject.LanguagesPicker.single')}
              </Typography>
            }
          />
          <RadioFormControl
            value='multi'
            control={<RadioBtn />}
            label={
              <Typography
                variant='body2'
                style={{ textTransform: 'uppercase' }}
              >
                {t('AddProject.LanguagesPicker.multi')}
              </Typography>
            }
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default LanguagesPicker;
