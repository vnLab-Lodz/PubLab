import React from 'react';
import * as Styled from './style';

interface Props {
  alt: string;
  image?: string;
  onClick?: () => void;
  error?: boolean;
}

const ImagePicker: React.FC<Props> = ({ image, error, onClick, alt }) => {
  const onKeyPress: React.KeyboardEventHandler = ({ key }) => {
    if (key !== 'Enter' || !onClick) return;

    onClick();
  };

  return image ? (
    <Styled.Img
      src={image}
      alt={alt}
      onClick={onClick}
      onKeyPress={onKeyPress}
      aria-label='image picker'
      tabIndex={0}
      role='button'
    />
  ) : (
    <Styled.OuterCircle
      error={!!error}
      onClick={onClick}
      onKeyPress={onKeyPress}
      aria-label='image picker'
      tabIndex={0}
      role='button'
    >
      <Styled.InnerCircle error={!!error}>
        <Styled.Add error={!!error} />
      </Styled.InnerCircle>
    </Styled.OuterCircle>
  );
};

ImagePicker.defaultProps = {
  image: undefined,
  onClick: () => {},
  error: false,
};

export default ImagePicker;
