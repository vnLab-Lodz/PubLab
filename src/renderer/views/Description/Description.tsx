import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../shared/redux/slices/currentUserSlice';
import { installGatsbyCLI } from '../../../shared/redux/slices/gatsbyInstallSlice';
import { saveSettingsAsync } from '../../../shared/redux/slices/settingsSlice';

const { dialog } = require('electron').remote;

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className='hello' style={{ color: 'red' }}>
        Hello World!
      </h1>
      <p className='description' style={{ color: 'blue' }}>
        Welcome to your Electron application.
      </p>
      <button type='button' onClick={() => dispatch(installGatsbyCLI())}>
        Install gatsby-cli
      </button>
      <button
        type='button'
        onClick={() => {
          dialog
            .showOpenDialog({
              properties: ['openDirectory'],
            })
            .then(({ filePaths }: any) => {
              dispatch(saveSettingsAsync({ defaultDirPath: filePaths[0] }));
            });
        }}
      >
        Pick directory
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
