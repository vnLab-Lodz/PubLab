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
  installGatsbyCLI,
  selectGatsbyInstallStatus,
} from '../../../shared/slices/gatsbyInstallSlice';

// TODO: delete exemplary buttons from here
const Description = () => {
  const currentUser = useSelector(selectCurrentUser);
  const shit = useSelector(selectGatsbyInstallStatus);

  // log user to showcase state changes if you don't have Redux Tools
  console.log(currentUser);
  console.log(shit);

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
      <button onClick={() => dispatch(installGatsbyCLI())}>
        Install gatsby-cli
      </button>
    </div>
  );
};

export default Description;
