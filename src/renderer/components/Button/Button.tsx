import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps extends MUIButtonProps {
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
}) => (
  <MUIButton
    className={`${textCase}`}
    style={{ borderRadius: 0, boxShadow: 'none' }}
    {...rest}
  >
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
