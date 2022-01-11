import { alpha, useTheme } from '@mui/material';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { Palette } from '@mui/material/styles/createPalette';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import * as Styled from './style';

interface ButtonProps extends MUIButtonProps {
  textCase?: 'lowercase' | 'uppercase' | 'sentence-case';
  fontWeight?: React.ComponentProps<typeof Typography>['fontWeight'];
  typographyVariant?: React.ComponentProps<typeof Typography>['variant'];
  color?: keyof Palette & MUIButtonProps['color'];
}

const Button: FC<ButtonProps> = ({
  textCase,
  fontWeight,
  typographyVariant,
  children,
  color,
  sx,
  ...rest
}) => {
  const themeColor = useTheme().palette[color || 'primary'];
  const combinedSx = {
    border:
      rest.variant === 'outlined' ? `1px solid ${themeColor.main}` : 'none',
    ':hover': {
      ...(rest.variant === 'contained' && {
        backgroundColor: alpha(themeColor.main, 0.8),
      }),
    },
    ':disabled': {
      ...(rest.variant === 'contained' && {
        backgroundColor: alpha(themeColor.main, 0.8),
      }),
    },
    ...sx,
  };
  return (
    <Styled.Button color={color} sx={combinedSx} {...rest}>
      <Typography
        sx={{
          textTransform: textCase === 'sentence-case' ? 'none' : textCase,
        }}
        variant={typographyVariant}
        fontWeight={fontWeight}
        margin='1em'
        lineHeight='1.4em'
      >
        {children}
      </Typography>
    </Styled.Button>
  );
};

Button.defaultProps = {
  textCase: 'uppercase',
  fontWeight: 'normal',
  typographyVariant: 'h4',
  color: 'primary',
};

export default Button;
