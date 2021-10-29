import React from 'react';
import './Description.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../shared/redux/slices/currentUserSlice';
import { installGatsbyCLI } from '../../../shared/redux/slices/gatsbyInstallSlice';

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className='hello'>Hello World!</h1>
      <p className='description'>Welcome to your Electron application.</p>
      <button type='button' onClick={() => dispatch(installGatsbyCLI())}>
        Install gatsby-cli
      </button>
      
      <p>
        Welcome <b>{currentUser.data?.nick || ''}</b>!
      </p>
      <img src={currentUser.data?.avatar || ''} alt='User avatar' />
      <p>
        Your work in <b>{currentUser.data?.company || ''}</b>
      </p>
    </div>
  );
};

export default Description;
