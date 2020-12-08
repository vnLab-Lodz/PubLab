import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentDirectory,
  selectHasDirectoryBeenSaved,
  setHasDirectoryBeenSaved,
  updateCurrentDirectory,
} from '../../../../shared/slices/directoriesSlice';
import Directory from './Directory/Directory';
import './Files.scss';
const { dialog } = require('electron').remote;
import add_circle_icon from './add_circle-24px.svg';

const Files = () => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector(selectCurrentDirectory);
  const hasDirectoryBeenSaved = useSelector(selectHasDirectoryBeenSaved);
  const directoriesHistory = JSON.parse(
    localStorage.getItem('directoriesHistory') || '[]'
  );

  const onProceedClicked = () => {
    if (!currentDirectory.path || currentDirectory.path == '-') return;

    if (Array.isArray(directoriesHistory)) {
      const duplicateIndex = directoriesHistory.findIndex(
        (item) => item.path === currentDirectory.path
      );
      if (duplicateIndex != -1) {
        directoriesHistory.splice(duplicateIndex, 1);
      }

      if (directoriesHistory.push(currentDirectory) > 3)
        directoriesHistory.shift();
      localStorage.directoriesHistory = JSON.stringify(directoriesHistory);
    } else {
      localStorage.directoriesHistory = JSON.stringify([currentDirectory]);
    }

    localStorage.selectedDirectory = JSON.stringify(currentDirectory.path);
    dispatch(setHasDirectoryBeenSaved(true));
  };

  const onOthersClicked = () => {
    dialog
      .showOpenDialog({ properties: ['openDirectory'] })
      .then((data: any) => {
        if (data.filePaths.length < 1) return;
        dispatch(updateCurrentDirectory(data.filePaths[0]));
      });
  };

  const onNewProjectClicked = () => {
    //TODO
    console.log('new Project');
  };

  function onDirectoryClicked(path: string) {
    return () => {
      dispatch(updateCurrentDirectory(path));
    };
  }

  return (
    <div className='files'>
      {!hasDirectoryBeenSaved ? (
        <div className='files__leftSection'>
          <div className='files__header'>Choose directory</div>
          <div className='files__lastUsedList'>
            <div className='files__lastUsedHeader'>Most recently selected:</div>
            {directoriesHistory &&
            Array.isArray(directoriesHistory) &&
            directoriesHistory.length > 0 ? (
              directoriesHistory.map((item: { path: string; date: string }) => (
                <Directory
                  path={item.path}
                  lastUsed={new Date(item.date)}
                  onClick={onDirectoryClicked(item.path)}
                />
              ))
            ) : (
              <div className='files__noDirectories'>No recent directories</div>
            )}
          </div>
          <button className='files__othersButton' onClick={onOthersClicked}>
            Other
          </button>
          <div className='files__selected'>{currentDirectory.path}</div>
          <button
            className={
              !currentDirectory.path || currentDirectory.path == '-'
                ? 'files__proceedButton_disabled'
                : 'files__proceedButton'
            }
            onClick={onProceedClicked}
          >
            Proceed
          </button>
        </div>
      ) : (
        <div className='files__leftSection-blue'>
          <img onClick={onNewProjectClicked} src={add_circle_icon} />
        </div>
      )}

      <div className='files__rightSection'>
        {hasDirectoryBeenSaved && (
          <div className='files__rightContent'>
            <div className='files__right_title'>PaaW</div>
            <div className='files__right_subtitle'>
              Click <img src={add_circle_icon} /> to create new project
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Files;
