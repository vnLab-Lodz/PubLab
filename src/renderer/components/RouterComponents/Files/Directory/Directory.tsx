import React from 'react';
import './Directory.scss';
import doc_icon from './doc_icon-24px.svg';

type DirectoryProps = {
  path: string;
  lastUsed: Date;
  onClick: Function;
};

const Directory = ({ path, lastUsed, onClick }: DirectoryProps) => {
  const onDirectoryClicked = () => {
    onClick();
  };

  return (
    <div onClick={onDirectoryClicked} className='directory'>
      <div className='directory__icon'>
        <img src={doc_icon} />
      </div>
      <div className='directory__content'>
        <div className='directory__lastUsed'>
          Last used:{' '}
          {lastUsed.getDate() +
            '.' +
            lastUsed.getMonth() +
            '.' +
            lastUsed.getFullYear()}
        </div>
        <div className='directory__path'>{path}</div>
      </div>
    </div>
  );
};

export default Directory;
