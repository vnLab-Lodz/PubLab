import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps extends MUIButtonProps {
  textCase?: 'lowercase' | 'uppercase' | 'sentence-case';
  fontWeight?: 'bold' | 'light';
}

const Button: FC<ButtonProps> = ({
  textCase,
  fontWeight,
  children,
  ...rest
}) => {
  return (
    <MUIButton className={`${textCase ?? 'lowercase'} ${fontWeight}`} {...rest}>
      {children}
    </MUIButton>
  );
};

export default Button;
