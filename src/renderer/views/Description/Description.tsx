import React from 'react';
import './Description.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../shared/redux/slices/currentUserSlice';
import { installGatsbyCLI } from '../../../shared/redux/slices/gatsbyInstallSlice';
import { installNodeJs } from '../../../shared/redux/slices/nodeInstallSlice';
import { generateNewProject } from '../../../shared/redux/slices/gatsbyGenerateProjectSlice';
import {
  saveSettingsAsync,
  selectDefaultDirPath,
} from '../../../shared/redux/slices/settingsSlice';

const { dialog } = require('electron').remote;

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dirPath = useSelector(selectDefaultDirPath);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className='hello'>Hello World!</h1>
      <p className='description'>Welcome to your Electron application.</p>
      <button type='button' onClick={() => dispatch(installGatsbyCLI())}>
        Install gatsby-cli
      </button>
      <button type='button' onClick={() => dispatch(installNodeJs())}>
        Install node.js
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
      <button
        type='button'
        onClick={() => {
          if (!dirPath) {
            alert('Pick a path first');
            return;
          }

          dispatch(
            generateNewProject({
              publicationName: 'testProject2',
              useSass: true,
              useTypescript: true,
            })
          );
        }}
      >
        Generate project
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
