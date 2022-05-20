import React, { CSSProperties } from 'react';

type Props = {
  color: CSSProperties['stroke'];
};

const FileIcon: React.FC<Props> = ({ color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='15.5'
    height='18'
    viewBox='0 0 15.5 18'
  >
    <g id='file3' transform='translate(0.5 0.5)'>
      <path
        id='Path_1'
        data-name='Path 1'
        d='M247.612,252.7A1.813,1.813,0,0,1,245.8,251V237.4a1.813,1.813,0,0,1,1.813-1.7l8.423.1,4.265,5V251a1.813,1.813,0,0,1-1.813,1.7Z'
        transform='translate(-245.8 -235.7)'
        fill='none'
        stroke={color}
        strokeMiterlimit='10'
        strokeWidth='1'
      />
      <path
        id='Path_2'
        data-name='Path 2'
        d='M259.9,241h-5v-5'
        transform='translate(-245.401 -235.7)'
        fill='none'
        stroke={color}
        strokeMiterlimit='10'
        strokeWidth='1'
      />
    </g>
  </svg>
);

export default FileIcon;
