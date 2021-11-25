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
}

const Button: FC<ButtonProps> = ({
  textCase,
  fontWeight,
  children,
  ...rest
}) => {
  const themeColor = useTheme().palette[rest.color];
  return (
    <MUIButton
      className={`${textCase}`}
      sx={{
        border:
          rest.variant === 'outlined'
            ? `1px solid ${alpha(themeColor.main, 1)}`
            : 'none',
        ':hover': {
          ...(rest.variant === 'contained' && {
            backgroundColor: alpha(themeColor.main, 0.8),
          }),
          boxShadow: 'none',
        },
        borderRadius: 0,
        boxShadow: 'none',
        padding: 0,
      }}
      {...rest}
    >
      <Typography
        fontWeight={fontWeight}
        color={rest.color}
        margin='1em'
        lineHeight='1.4em'
      >
        {children}
      </Typography>
    </MUIButton>
  );
};

Button.defaultProps = {
  textCase: 'uppercase',
  fontWeight: 'normal',
};

export default Button;
