import React, { CSSProperties } from 'react';

type Props = {
  color: CSSProperties['stroke'];
};

const FolderIcon: React.FC<Props> = ({ color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='16'
    viewBox='0 0 18 16'
  >
    <path
      id='file'
      d='M256.3,243.5h-9.5l-.3-.7a1.644,1.644,0,0,0-1.2-.8h-3.4a.882.882,0,0,0-.9.8v12.5a1.752,1.752,0,0,0,1.7,1.7h13.6a1.752,1.752,0,0,0,1.7-1.7V245.1A1.738,1.738,0,0,0,256.3,243.5Z'
      transform='translate(-240.5 -241.5)'
      fill='none'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='1'
    />
  </svg>
);

export default FolderIcon;
