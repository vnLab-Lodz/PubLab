import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import ImagePicker from '../ImagePicker/ImagePicker';
import TextField from '../TextField/TextField';
import TextArea from '../TextArea/TextArea';
import InputLabel from '../InputLabel/InputLabel';
import * as Styled from './style';
import { FormFields, validationSchema } from './validationSchema';
import { Publication } from '../../../shared/types';

type State = Pick<Publication, 'name' | 'description' | 'imagePath'>;

interface Props {
  onValidationStateChange: (didValidationPass: boolean) => void;
  onSubmit: (state: State) => void;
  state: State;
}

export default function ProjectDetailsInput({
  onValidationStateChange,
  onSubmit,
  state,
}: Props) {
  const { t } = useTranslation();

  const formik = useFormik<FormFields>({
    initialValues: {
      name: state.name,
      description: state.description,
    },
    validationSchema,
    onSubmit: ({ name, description = '' }, { setSubmitting }) => {
      onSubmit({ ...state, name, description });
      onValidationStateChange(true);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    const { isValid, dirty, touched, submitForm } = formik;

    if (isValid && (dirty || Object.keys(touched).length)) submitForm();
    else if (!isValid) onValidationStateChange(false);
  }, [formik.values, formik.errors]);

  return (
    <Styled.GridContainer>
      <div className='left-column'>
        <InputLabel id='img-picker-label'>
          {t('ProjectDetails.projectPhoto')}:
        </InputLabel>
        <ImagePicker alt='Project cover' image={state.imagePath} />
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
          onBlur={(e) => {
            formik.setFieldValue('name', e.target.value.trim());
            formik.handleBlur(e);
          }}
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
          onBlur={(e) => {
            formik.setFieldValue('description', e.target.value.trim());
            formik.handleBlur(e);
          }}
        />
      </div>
    </Styled.GridContainer>
  );
}
