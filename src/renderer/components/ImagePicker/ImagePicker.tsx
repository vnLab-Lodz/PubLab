import React, { ReactElement } from 'react';
import './ImagePicker.scss';

interface Props {
  image?: string;
  onClick?: () => void;
  error?: boolean;
}

const ImagePicker: React.FC<Props> = ({ image, error }) => {
  if (!image) {
    return error ? (
      <div className='img error'>
        <div className='imgplus error' />
      </div>
    ) : (
      <div className='img'>
        <div className='imgplus' />
      </div>
    );
  } else {
    return <img className='img selected' src={image} />;
  }
};

export default ImagePicker;
