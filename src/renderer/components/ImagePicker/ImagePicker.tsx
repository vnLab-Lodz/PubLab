import React from 'react';
import './ImagePicker.scss';

interface Props {
  image?: string;
  onClick?: () => void;
  error?: boolean;
}

const ImagePicker: React.FC<Props> = ({ image, error, onClick }) => {
  if (image)
    return <img className='img selected' src={image} alt='Example alt' />;

  const makeClass = (base: string): string => (error ? `${base} error` : base);

  return (
    <div
      aria-label='image picker'
      tabIndex={0}
      role='button'
      className={makeClass('img')}
      onClick={onClick}
      onKeyPress={({ key }) => key === 'Enter' && onClick()}
    >
      <div className={makeClass('imgplus')} />
    </div>
  );
};

ImagePicker.defaultProps = {
  image: undefined,
  onClick: () => {},
  error: false,
};

export default ImagePicker;
