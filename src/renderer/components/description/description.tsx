import React from 'react';
import './description.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  example,
  exampleInMain,
  exampleLocal,
  selectCurrentUser,
} from '../../../shared/slices/currentUserSlice';
import {
  selectDefaultDirPath,
  setDefaultDirPath,
} from '../../../shared/slices/configurationSlice';
import findLocalPublications from '../../../main/node/file-manager';

// TODO: delete exemplary buttons from here
const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const path = useSelector(selectDefaultDirPath);

  // log user to showcase state changes if you don't have Redux Tools
  console.log(currentUser);
  console.log(path);
  console.log(findLocalPublications());

  const dispatch = useDispatch();
  return (
    <div>
      <p className='description'>Welcome to your Electron application.</p>
      <button
        onClick={() => dispatch(example({ nick: 'currentUser from renderer' }))}
      >
        Dispatch Example action
      </button>
      <button
        onClick={() =>
          dispatch(
            exampleLocal({
              data: {
                nick: 'all of currentUser from renderer',
              },
            })
          )
        }
      >
        Dispatch Example local action
      </button>
      <button
        onClick={() =>
          dispatch(
            exampleInMain({
              data: {
                nick: 'currentUser from action executed only in main process',
              },
            })
          )
        }
      >
        Dispatch Example action in main process
      </button>
      // test stuff for choosing a directory
      <div
        style={{ cursor: 'pointer' }}
        onClick={async () => {
          const { dialog } = require('electron').remote;
          const dir = await dialog.showOpenDialog({
            properties: ['openDirectory'],
          });
          const dirPath = dir.filePaths[0];

          dispatch(setDefaultDirPath(dirPath));
        }}
      >
        Choose directory: {path}
      </div>
    </div>
  );
};

export default Description;
