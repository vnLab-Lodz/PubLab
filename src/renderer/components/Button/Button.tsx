import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps extends MUIButtonProps {
  textCase?: 'lowercase' | 'uppercase' | 'sentence-case';
  fontWeight?: string;
  textColor?: any;
}

const Button: FC<ButtonProps> = ({
  textCase,
  fontWeight,
  textColor,
  children,
  ...rest
}) => (
  <MUIButton className={`${textCase}`} {...rest}>
    <Typography fontWeight={fontWeight} color={textColor}>
      {children}
    </Typography>
  </MUIButton>
);

Button.defaultProps = {
  textCase: 'lowercase',
  fontWeight: 'normal',
  textColor: 'text.secondary',
};

export default Button;
