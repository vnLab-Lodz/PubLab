import React, { ReactElement } from 'react';
import './AuthButton.scss';

interface Props {
  icon?: ReactElement;
  disabled?: boolean;
}

const AuthButton: React.FC<Props> = ({ children, icon, disabled }) => (
  <button type='button' className='auth-btn' disabled={disabled}>
    {icon && <div className='auth-btn__icon'>{icon}</div>}
    <p className='auth-btn__text'>{children}</p>
  </button>
);

AuthButton.defaultProps = {
  icon: undefined,
  disabled: false,
};

export default AuthButton;
