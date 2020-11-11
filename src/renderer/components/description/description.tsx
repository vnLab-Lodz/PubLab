import React from 'react';
import './description.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  example,
  exampleLocal,
  selectCurrentUser,
} from '../../../shared/slices/currentUserSlice';

// TODO: delete exemplary buttons from here
const Description = () => {
  const currentUser = useSelector(selectCurrentUser);

  // log user to showcase state changes if you don't have Redux Tools
  console.log(currentUser);

  const dispatch = useDispatch();
  return (
    <div>
      <p className='description'>Welcome to your Electron application.</p>
      <button onClick={() => dispatch(example({ nick: 'currentUser from renderer' }))}>
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
    </div>
  );
};

export default Description;
