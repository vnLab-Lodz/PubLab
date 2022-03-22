import { ipcRenderer } from 'electron';
import React from 'react';
import { useSelector } from 'react-redux';
import { CHANNELS } from 'src/shared/types/api';
import { selectCurrentUser } from '../../../shared/redux/slices/currentUserSlice';

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div>
      <h1 className='hello' style={{ color: 'red' }}>
        Hello World!
      </h1>
      <p className='description' style={{ color: 'blue' }}>
        Welcome to your Electron application.
      </p>
      <button
        type='button'
        onClick={async () => {
          const isInstalled = await ipcRenderer.invoke(CHANNELS.GATSBY.VERIFY);
          console.log('gatsby-cli installation status: ', isInstalled);
          // if (!isCliInstalled) ipcRenderer.invoke(CHANNELS.GATSBY.INSTALL);
        }}
      >
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
