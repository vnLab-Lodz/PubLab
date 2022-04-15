import { ipcRenderer } from 'electron';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activePublication } from 'src/shared/redux/slices/loadPublicationsSlice';
import { sendNotification } from 'src/shared/redux/slices/notificationsSlice';
import { CHANNELS } from 'src/shared/types/api';
import { selectCurrentUser } from '../../../shared/redux/slices/currentUserSlice';

const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const publication = useSelector(activePublication);
  const dispatch = useDispatch();

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
      <button
        type='button'
        onClick={async () => {
          const isInstalled = await ipcRenderer.invoke(CHANNELS.NODE.VERIFY);
          console.log('node installation status: ', isInstalled);
          // if (!isCliInstalled) ipcRenderer.invoke(CHANNELS.NODE.INSTALL);
        }}
      >
        Install node
      </button>
      <button
        type='button'
        onClick={async () => {
          const data = await ipcRenderer.invoke(
            CHANNELS.PUBLICATIONS.FIND_REMOTE
          );
          console.log(data);
        }}
      >
        Fine remote
      </button>
      <button
        type='button'
        onClick={() => {
          dispatch(
            sendNotification({
              message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptas cum eveniet enim laborum qui exercitationem delectus quod voluptatum, minima reprehenderit. Nobis eos obcaecati iure sapiente molestias alias dolore minima!',
              title: 'Title',
              type: 'info',
            })
          );
        }}
      >
        Info Notification
      </button>
      <button
        type='button'
        onClick={() => {
          dispatch(
            sendNotification({
              message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptas cum eveniet enim laborum qui exercitationem delectus quod voluptatum, minima reprehenderit. Nobis eos obcaecati iure sapiente molestias alias dolore minima!',
              title: 'Title',
              type: 'error',
            })
          );
        }}
      >
        Error Notification
      </button>
      <button
        type='button'
        onClick={() => {
          dispatch(
            sendNotification({
              message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptas cum eveniet enim laborum qui exercitationem delectus quod voluptatum, minima reprehenderit. Nobis eos obcaecati iure sapiente molestias alias dolore minima!',
              type: 'success',
              autoDismiss: true,
              delay: 2000,
            })
          );
        }}
      >
        Success Notification
      </button>
      <button
        type='button'
        onClick={() => {
          dispatch(
            sendNotification({
              message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptas cum eveniet enim laborum qui exercitationem delectus quod voluptatum, minima reprehenderit. Nobis eos obcaecati iure sapiente molestias alias dolore minima!',
              title: 'Title',
              type: 'warning',
            })
          );
        }}
      >
        Warning Notification
      </button>

      <p>
        Welcome <b>{currentUser.data?.nick || ''}</b>!
      </p>
      <img src={currentUser.data?.avatar || ''} alt='User avatar' height={64} />
      <p>
        Organizations: <b>{currentUser.data?.organizations.toString() || ''}</b>
      </p>
      <p style={{ whiteSpace: 'break-spaces' }}>
        {JSON.stringify(publication, null, 2)}
      </p>
    </div>
  );
};

export default Description;
