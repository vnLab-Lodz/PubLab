import { alpha, useTheme } from '@mui/material';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { Palette } from '@mui/material/styles/createPalette';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import * as Styled from './style';

interface ButtonProps extends MUIButtonProps {
  textCase?: 'lowercase' | 'uppercase' | 'sentence-case';
  color?: keyof Palette & MUIButtonProps['color'];
  isMajor?: boolean;
}

const Button: FC<ButtonProps> = ({
  textCase,
  children,
  color,
  isMajor,
  sx,
  ...rest
}) => {
  const themeColor = useTheme().palette[color || 'primary'];
  const combinedSx = {
    my: isMajor ? 4 : 2,
    padding: isMajor ? '2rem' : '1.5rem',
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
          fontWeight: isMajor ? '700' : '400',
          flexBasis: '100%',
          mx: 1,
        }}
        variant={isMajor ? 'body1' : 'body2'}
      >
        {children}
      </Typography>
    </Styled.Button>
  );
};

Button.defaultProps = {
  textCase: 'uppercase',
  color: 'primary',
  isMajor: false,
};

export default Button;
