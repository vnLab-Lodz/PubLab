import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import * as Styled from './style';

type Props = React.ComponentProps<typeof Styled.InputLabel> & {
  typographyVariant?: Exclude<TypographyProps['variant'], 'inherit'>;
};

const InputLabel: React.FC<Props> = ({
  children,
  typographyVariant,
  ...rest
}: Props) => (
  <Styled.InputLabel {...rest}>
    <Typography variant={typographyVariant}>{children}</Typography>
  </Styled.InputLabel>
);

InputLabel.defaultProps = {
  typographyVariant: 'body2',
};

export default InputLabel;
