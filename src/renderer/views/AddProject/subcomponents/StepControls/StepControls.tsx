import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button/Button';

interface Props {
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickFinished: () => void;
  isNextButtonDisabled?: boolean;
  isStepLast?: boolean;
}

const StepControls: React.FC<Props> = ({
  onClickPrevious,
  onClickNext,
  onClickFinished,
  isNextButtonDisabled,
  isStepLast,
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex' }}>
      <Button variant='outlined' isMajor fullWidth onClick={onClickPrevious}>
        {t('AddProject.buttons.back')}
      </Button>
      <Button
        id='next-button'
        color='green'
        variant='contained'
        isMajor
        fullWidth
        disabled={isNextButtonDisabled}
        onClick={isStepLast ? onClickFinished : onClickNext}
      >
        {isStepLast
          ? t('AddProject.buttons.finalize')
          : t('AddProject.buttons.next')}
      </Button>
    </Box>
  );
};

StepControls.defaultProps = {
  isNextButtonDisabled: false,
  isStepLast: false,
};

export default StepControls;
