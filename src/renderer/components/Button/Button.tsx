import { alpha, useTheme } from '@mui/material';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { Palette } from '@mui/material/styles/createPalette';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import './Button.scss';

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
  ...rest
}) => {
  const themeColor = useTheme().palette[color || 'primary'];
  return (
    <MUIButton
      className={`${textCase}`}
      color={color}
      sx={{
        border:
          rest.variant === 'outlined' ? `1px solid ${themeColor.main}` : 'none',
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
        variant={typographyVariant}
        fontWeight={fontWeight}
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
  typographyVariant: 'h4',
  color: 'primary',
};

export default Button;
