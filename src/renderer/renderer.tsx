import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './localisation/i18next';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
