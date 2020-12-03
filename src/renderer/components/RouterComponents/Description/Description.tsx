import React from 'react';
import './Description.scss';
import { useDispatch, useSelector } from 'react-redux';
import { displayUserData, selectCurrentUser } from '../../../../shared/slices/currentUserSlice';
import {
  installGatsbyCLI,
  selectGatsbyInstallStatus,
} from '../../../../shared/slices/gatsbyInstallSlice';

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const gatsbyInstallStuff = useSelector(selectGatsbyInstallStatus);

  // log user to showcase state changes if you don't have Redux Tools
  console.log(currentUser);
  console.log(gatsbyInstallStuff);

  const dispatch = useDispatch();
  return (
    <div>
      <h1 className='hello'>Hello World!</h1>
      <p className='description'>Welcome to your Electron application.</p>
      <button onClick={() => dispatch(installGatsbyCLI())}>
        Install gatsby-cli
      </button>
      <button onClick={() => dispatch(displayUserData(currentUser.auth.accessToken.value))}>Display user data</button>
      <p>Welcome <b>{currentUser.data.nick}</b>!</p>
      <img src={currentUser.data.avatar} />
      <p>Your work in <b>{currentUser.data.company}</b></p>
    </div>
  );
};

export default Description;
