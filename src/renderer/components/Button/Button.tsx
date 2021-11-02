import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps extends MUIButtonProps {}

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <MUIButton {...rest}>{children}</MUIButton>;
};

export default Button;
