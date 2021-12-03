import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import * as Styled from './style';

type Props = React.ComponentProps<typeof Styled.InputLabel> & {
  typographyVariant?: Exclude<TypographyProps['variant'], 'inherit'>;
};

const InputLabel: React.FC<Props> = ({
  color,
  children,
  typographyVariant,
  ...rest
}: Props) => (
  <Styled.InputLabel
    {...rest}
    sx={{
      fontSize: (theme) => theme.typography[typographyVariant || 'h4'].fontSize,
      ...rest.sx,
    }}
  >
    <Typography variant={typographyVariant}>{children}</Typography>
  </Styled.InputLabel>
);

InputLabel.defaultProps = {
  typographyVariant: 'h4',
};

export default InputLabel;
