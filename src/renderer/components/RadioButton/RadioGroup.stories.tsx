import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Typography } from '@mui/material';
import RadioBtn from './RadioBtn';

interface Props {
  disabled1?: boolean;
  disabled2?: boolean;
  defaults?: string;
}

const RadioForm: React.FC<Props> = ({ disabled1, disabled2, defaults }) => (
  <FormControl component='fieldset' style={{ padding: '2rem' }}>
    <Box pb={4} pt={2}>
      <FormLabel component='legend'>
        <Typography variant='body2' color='text.primary'>
          Choose the Package Manager:
        </Typography>
      </FormLabel>
    </Box>
    <RadioGroup defaultValue={defaults} name='customized-radios'>
      <FormControlLabel
        disabled={disabled1}
        value='yarn'
        control={<RadioBtn />}
        label={
          <Typography variant='caption' color='default'>
            YARN
          </Typography>
        }
      />
      <FormControlLabel
        disabled={disabled2}
        value='npm'
        control={<RadioBtn />}
        label={
          <Typography variant='caption' color='default'>
            NPM
          </Typography>
        }
      />
    </RadioGroup>
  </FormControl>
);

RadioForm.defaultProps = {
  disabled1: false,
  disabled2: false,
  defaults: 'npm',
};

export default {
  title: 'Example/RadioGroup',
  component: RadioForm,
  argTypes: {},
} as ComponentMeta<typeof RadioForm>;

const Template: ComponentStory<typeof RadioForm> = (args) => (
  <RadioForm {...args} />
);
export const Normal = Template.bind({});
Normal.args = {};

export const DefaultNPM = Template.bind({});
DefaultNPM.args = {
  defaults: 'npm',
};

export const DefaultYarn = Template.bind({});
DefaultYarn.args = {
  defaults: 'yarn',
};

export const Disabled1 = Template.bind({});
Disabled1.args = {
  disabled1: true,
};

export const Disabled2 = Template.bind({});
Disabled2.args = {
  disabled2: true,
};

export const DisabledBoth = Template.bind({});
DisabledBoth.args = {
  disabled1: true,
  disabled2: true,
};
