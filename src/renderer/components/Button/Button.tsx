import { alpha, useTheme } from '@mui/material';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { Palette } from '@mui/material/styles/createPalette';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps extends MUIButtonProps {
  color: keyof Palette & MUIButtonProps['color'];
  textCase?: 'lowercase' | 'uppercase' | 'sentence-case';
  fontWeight?: React.ComponentProps<typeof Typography>['fontWeight'];
  textColor?: React.ComponentProps<typeof Typography>['color'];
}

const Button: FC<ButtonProps> = ({
  textCase,
  fontWeight,
  textColor,
  children,
  ...rest
}) => {
  const themeColor = useTheme().palette[rest.color];
  return (
    <MUIButton
      className={`${textCase}`}
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        border:
          rest.variant === 'outlined'
            ? `1px solid ${alpha(themeColor.main, 1)}`
            : 'none',
        ':hover': {
          boxShadow: 'none',
          ...(rest.variant === 'contained' && {
            backgroundColor: alpha(themeColor.main, 0.8),
          }),
        },
      }}
      {...rest}
    >
      <Typography fontWeight={fontWeight} color={rest.color}>
        {children}
      </Typography>
    </MUIButton>
  );
};

Button.defaultProps = {
  textCase: 'lowercase',
  fontWeight: 'normal',
  textColor: 'text.secondary',
};

export default Button;
