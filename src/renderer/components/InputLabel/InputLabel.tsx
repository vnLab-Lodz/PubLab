import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { StyledInputLabel } from './style';

type Props = React.ComponentProps<typeof StyledInputLabel> & {
  typographyVariant?: TypographyProps['variant'];
};

const InputLabel: React.FC<Props> = ({
  color,
  children,
  typographyVariant,
  ...rest
}: Props) => (
  <StyledInputLabel {...rest}>
    <Typography variant={typographyVariant}>{children}</Typography>
  </StyledInputLabel>
);

InputLabel.defaultProps = {
  typographyVariant: 'h4',
};

export default InputLabel;
