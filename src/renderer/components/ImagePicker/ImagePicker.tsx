import React from 'react';
import useAssetURI from '../../hooks/useAssetURI';
import * as Styled from './style';

interface Props {
  alt: string;
  imagePath?: string;
  onClick?: () => void;
  error?: boolean;
}

const ImagePicker: React.FC<Props> = ({ imagePath, error, onClick, alt }) => {
  const onKeyPress: React.KeyboardEventHandler = ({ key }) => {
    if (key !== 'Enter' || !onClick) return;

    onClick();
  };

  const { uri: imageURI } = useAssetURI(imagePath);

  return imageURI ? (
    <Styled.Img
      src={imageURI}
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
  imagePath: undefined,
  onClick: () => {},
  error: false,
};

export default ImagePicker;
