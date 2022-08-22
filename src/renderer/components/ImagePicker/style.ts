import { Box, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Img = styled('img')(({ theme: { palette } }) => ({
  border: `1px solid ${palette.primary.main}`,
  borderRadius: '50%',
  height: '9em',
  width: '9em',
  cursor: 'pointer',
  objectFit: 'cover',
}));

export const OuterCircle = styled(Box, {
  name: 'OuterCircle',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'error',
})<{
  error: boolean;
}>(({ theme: { palette }, error }) => ({
  border: `1px solid ${error ? palette.error.main : palette.primary.main}`,
  borderRadius: '50%',
  height: '9em',
  width: '9em',
  position: 'relative',
  cursor: 'pointer',
}));

export const InnerCircle = styled(Box, {
  name: 'InnerCircle',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'error',
})<{
  error: boolean;
}>(({ theme: { palette }, error }) => ({
  border: `1px solid ${error ? palette.error.main : palette.primary.main}`,
  borderRadius: '50%',
  height: '1.5em',
  width: '1.5em',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Add = styled(AddIcon, {
  name: 'AddImagePickerIcon',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'error',
})<{
  error: boolean;
}>(({ theme: { palette }, error }) => ({
  color: error ? palette.error.main : palette.primary.main,
  height: '0.8em',
  width: '0.8em',
}));
