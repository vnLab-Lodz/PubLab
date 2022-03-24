import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import ImagePicker from '../../../../components/ImagePicker/ImagePicker';
import TextField from '../../../../components/TextField/TextField';
import TextArea from '../../../../components/TextArea/TextArea';
import InputLabel from '../../../../components/InputLabel/InputLabel';
import {
  newPublication,
  setPublicationField,
} from '../../../../../shared/redux/slices/addPublicationWizardSlice';
import * as Styled from './style';
import { FormFields, validationSchema } from './validationSchema';

interface Props {
  setNextButtonEnabled: (enabled: boolean) => void;
}

export default function ProjectDetailsInput({ setNextButtonEnabled }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const publication = useSelector(newPublication);

  const formik = useFormik<FormFields>({
    initialValues: {
      name: publication.name,
      description: publication.description,
    },
    validationSchema,
    onSubmit: ({ name, description: desc = '' }, { setSubmitting }) => {
      dispatch(setPublicationField({ field: 'name', value: name }));
      dispatch(setPublicationField({ field: 'description', value: desc }));
      setNextButtonEnabled(true);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    const { isValid, dirty, touched, submitForm } = formik;

    if (isValid && (dirty || Object.keys(touched).length)) submitForm();
    else if (!isValid) setNextButtonEnabled(false);
  }, [formik.values, formik.errors]);

  return (
    <Styled.GridContainer>
      <div className='left-column'>
        <InputLabel id='img-picker-label'>
          {t('ProjectDetails.projectPhoto')}:
        </InputLabel>
        <ImagePicker alt='Project cover' image={publication.imagePath} />
      </div>
      <div className='right-column'>
        <InputLabel id='project-name-label' error={Boolean(formik.errors.name)}>
          {t('ProjectDetails.projectName')}:
        </InputLabel>
        <TextField
          id='name'
          aria-labelledby='project-name-label'
          fullWidth
          placeholder={t(
            (formik.errors.name as any) || 'ProjectDetails.projectNameDetails'
          )}
          error={Boolean(formik.errors.name)}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputLabel
          id='project-description-label'
          error={Boolean(formik.errors.description)}
        >
          {t('ProjectDetails.projectDescription')}:
        </InputLabel>
        <TextArea
          id='description'
          aria-labelledby='project-description-label'
          fullWidth
          placeholder={t('ProjectDetails.projectDescriptionDetails')}
          error={Boolean(formik.errors.description)}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
    </Styled.GridContainer>
  );
}
