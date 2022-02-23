import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getVersionDetails } from '../../../../../shared/utils/versionDetails';
import Logo from '../../../../assets/publab.png';
import Button from '../../../../components/Button/Button';
import * as Styled from './style';

const AppUpdate: React.FC = () => {
  const { t } = useTranslation();
  const versionDetails = getVersionDetails();
  return (
    <Styled.Container>
      <Styled.LogoImg src={Logo} alt='PubLab' />
      <Typography>
        {t('AppSettings.updates.version')} {versionDetails.version}
      </Typography>

      {versionDetails.isUpToDate && (
        <Styled.UpdatePromptContainer>
          <Typography>
            {t('AppSettings.updates.newVersionAvailable')}
          </Typography>
          <Button variant='contained' fullWidth>
            {t('AppSettings.updates.update')}
          </Button>
        </Styled.UpdatePromptContainer>
      )}
    </Styled.Container>
  );
};

export default AppUpdate;

// TODO: implement update logic
