import add_icon from '../ProjectsList/add_circle-24px.svg';
import React from 'react';

const NoProjects = () => (
  <h2
    style={{
      marginLeft: '35px',
      marginRight: '35px',
      marginTop: '450px',
      verticalAlign: 'middle',
      textAlign: 'center',
    }}
  >
    Click <img src={add_icon} style={{ borderRadius: '50%' }} /> to create new
    project
  </h2>
);

export default NoProjects;
