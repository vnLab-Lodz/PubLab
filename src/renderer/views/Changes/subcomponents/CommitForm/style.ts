import { styled } from '@mui/material';
import BaseInputLabel from '../../../../components/InputLabel/InputLabel';

export const InputLabel = styled(BaseInputLabel)({
  textTransform: 'none',
  '& .MuiTypography-root': { fontWeight: 700 },
});
