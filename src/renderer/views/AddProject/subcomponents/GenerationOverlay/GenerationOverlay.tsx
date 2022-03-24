import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectPublicationGenerationStatus,
  PUBLICATION_GENERATION_STATUS as STATUS,
} from 'src/shared/redux/slices/publicationGenerationSlice';
import LoadingOverlay from '../../../../components/LoadingOverlay/LoadingOverlay';
import * as Styled from './style';

const GenerationOverlay = () => {
  const status = useSelector(selectPublicationGenerationStatus);
  const { t } = useTranslation();
  const [message, setMessage] = useState(
    t('AddProject.loading.creatingGatsbyProject')
  );

  useEffect(() => {
    if ([STATUS.IDLE, STATUS.FAILURE, STATUS.SUCCESS].includes(status)) return;

    let nextMessage: string;

    switch (status) {
      case STATUS.GENERATING_GATSBY_PROJECT:
        nextMessage = t('AddProject.loading.creatingGatsbyProject');
        break;
      case STATUS.CREATING_CONFIGURATION_FILE:
        nextMessage = t('AddProject.loading.creatingConfigurationFile');
        break;
      case STATUS.MODIFYING_PACKAGE_JSON:
        nextMessage = t('AddProject.loading.modifyingPackageJson');
        break;
      case STATUS.MODIFYING_GATSBY_CONFIG:
        nextMessage = t('AddProject.loading.modifyingGatsbyConfig');
        break;
      default:
        nextMessage = '';
    }

    setMessage(nextMessage);
  }, [status]);

  return (
    <LoadingOverlay>
      <Styled.Message>{message}</Styled.Message>
    </LoadingOverlay>
  );
};

export default GenerationOverlay;
