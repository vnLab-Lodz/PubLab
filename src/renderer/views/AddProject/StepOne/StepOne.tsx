/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import ImagePicker from '../../../components/ImagePicker/ImagePicker';
import TextField from '../../../components/TextField/TextField';
import TextArea from '../../../components/TextArea/TextArea';
import InputLabel from '../../../components/InputLabel/InputLabel';
import './StepOne.scss';
import { useTranslation } from 'react-i18next';

export default function StepOne(props: any) {
  const [imagePickerError, setImagePickerError] = useState(false);
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);

  const [imageValidationTriggered, setImageValidationTriggered] =
    useState(false);
  const [nameValidationTriggered, setNameValidationTriggered] = useState(false);
  const [descValidationTriggered, setDescValidationTriggered] = useState(false);

  const { t } = useTranslation();

  const handleImageValidation = () => {
    setImagePickerError(true);
    setImageValidationTriggered(true);
  };

  const handleNameValidation = (input: string) => {
    input === '' ? setNameInputError(true) : setNameInputError(false);
    setNameValidationTriggered(true);
  };

  const handleDescValidation = (input: string) => {
    input === '' ? setDescInputError(true) : setDescInputError(false);
    setDescValidationTriggered(true);
  };

  useEffect(() => {
    //add check for imageValidationTriggered after adding image will be handled (now clicking doesn't open img selection dialog)
    if (nameValidationTriggered && descValidationTriggered) {
      imagePickerError || nameInputError || descInputError
        ? props.setNextButtonEnabled(false)
        : props.setNextButtonEnabled(true);
    }
  }, [imagePickerError, nameInputError, descInputError]);

  return (
    <div className='grid-container'>
      <div className='left-column'>
        <InputLabel error={imagePickerError} typographyVariant='h3'>
          {t('StepOne.projectPhoto')}
        </InputLabel>
        <ImagePicker
          alt='Project cover'
          error={imagePickerError}
          onClick={() => handleImageValidation()}
        />
      </div>
      <div className='right-column'>
        <InputLabel error={nameInputError} typographyVariant='h3'>
          {t('StepOne.projectName')}
        </InputLabel>
        <TextField
          className='name-input-field'
          placeholder={t('StepOne.projectNameDetails')}
          error={nameInputError}
          onChange={(e) => handleNameValidation(e.target.value)}
        />
        <InputLabel error={descInputError} typographyVariant='h3'>
          {t('StepOne.projectDescription')}
        </InputLabel>
        <TextArea
          className='desc-input-field'
          placeholder={t('StepOne.projectDescriptionDetails')}
          error={descInputError}
          onChange={(e) => handleDescValidation(e.target.value)}
        />
      </div>
    </div>
  );
}
