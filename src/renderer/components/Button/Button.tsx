import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps extends MUIButtonProps {
  text: string;
  textCase?: 'lowercase' | 'uppercase' | 'sentence-case';
  fontWeight?: 'bold' | 'light';
}

const Button: FC<ButtonProps> = ({
  text,
  textCase,
  fontWeight,
  children,
  ...rest
}) => {
  return (
    <MUIButton className={`${textCase ?? 'lowercase'} ${fontWeight}`} {...rest}>
      {text}
    </MUIButton>
  );
};

export default Button;
