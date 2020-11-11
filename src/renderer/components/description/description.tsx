import React from 'react';
import './description.scss'
import {useDispatch} from "react-redux";
import {exampleAction, exampleLocalAction} from "../../../shared/actions/example";

// TODO: delete exemplary buttons from here
const Description = () => {
  const dispatch = useDispatch();
  return <div>
    <p className='description'>Welcome to your Electron application.</p>
    <button onClick={() => dispatch(exampleAction('example action'))}>Dispatch Example action</button>
    <button onClick={() => dispatch(exampleLocalAction('example action'))}>Dispatch Example local action</button>
  </div>;
};

export default Description;
