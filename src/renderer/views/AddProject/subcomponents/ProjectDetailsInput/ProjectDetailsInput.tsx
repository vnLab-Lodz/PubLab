import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ImagePicker from '../../../../components/ImagePicker/ImagePicker';
import TextField from '../../../../components/TextField/TextField';
import TextArea from '../../../../components/TextArea/TextArea';
import InputLabel from '../../../../components/InputLabel/InputLabel';
import { Publication } from '../../../../../shared/redux/slices/loadPublicationsSlice';
import {
  newPublication,
  setPublicationField,
} from '../../../../../shared/redux/slices/addPublicationSlice';
import * as Styled from './style';

interface Props {
  setNextButtonEnabled: (enabled: boolean) => void;
}

type SetEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function ProjectDetailsInput({ setNextButtonEnabled }: Props) {
  const [imagePickerError] = useState(false);
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { imagePath, description, publicationName } =
    useSelector(newPublication);

  useEffect(
    () => setNextButtonEnabled(!!description && !!publicationName),
    [description, publicationName]
  );

  const setField = (
    field: keyof Pick<Publication, 'publicationName' | 'description'>,
    { target: { value } }: SetEvent
  ) => {
    dispatch(setPublicationField({ field, value }));
  };

  return (
    <Styled.GridContainer>
      <div className='left-column'>
        <InputLabel error={imagePickerError} id='img-picker-label'>
          {t('StepOne.projectPhoto')}:
        </InputLabel>
        <ImagePicker
          alt='Project cover'
          error={imagePickerError}
          image={imagePath}
        />
      </div>
      <div className='right-column'>
        <InputLabel error={nameInputError} id='project-name-label'>
          {t('StepOne.projectName')}:
        </InputLabel>
        <TextField
          aria-labelledby='project-name-label'
          fullWidth
          placeholder={t('StepOne.projectNameDetails')}
          error={nameInputError}
          value={publicationName}
          onChange={(e) => setField('publicationName', e)}
          onBlur={(e) => setNameInputError(e.target.value === '')}
        />
        <InputLabel error={descInputError} id='project-description-label'>
          {t('StepOne.projectDescription')}:
        </InputLabel>
        <TextArea
          aria-labelledby='project-description-label'
          fullWidth
          placeholder={t('StepOne.projectDescriptionDetails')}
          error={descInputError}
          value={description}
          onChange={(e) => setField('description', e)}
          onBlur={(e) => setDescInputError(e.target.value === '')}
        />
      </div>
    </Styled.GridContainer>
  );
}
