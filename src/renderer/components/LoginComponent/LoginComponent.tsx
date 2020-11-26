import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './LoginComponent.scss';

const LoginComponent = () => {

  return (
    <div className="container">
    <div>Welcome to VNlab</div>
    <div>
    <button className="button"onClick={()=>{console.log('Prompt new browser window with GitHub auth.')}}>Login to GitHub <FaGithub />
</button>
    </div>
    </div>
  );
};

export default LoginComponent;