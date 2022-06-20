import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectRepoTree } from '../../../../../shared/redux/slices/repoStatusSlice';
import * as checkStatus from '../../../../../shared/utils/repoStatus/statusChecks';
import * as repoTree from '../../../../../shared/utils/repoStatus/tree';
import Section from '../../../../components/Section/Section';
import TextField from '../../../../components/TextField/TextField';
import ChangedFile from '../ChangedFile/ChangedFile';
import { validationSchema, FormFields } from './validationSchema';
import * as Styled from './style';
import Button from '../../../../components/Button/Button';
import TextArea from '../../../../components/TextArea/TextArea';
import { gitCommit } from '../../../../ipc';

interface Props {
  closeForm: () => void;
}

const CommitForm: React.FC<Props> = ({ closeForm }) => {
  const { t } = useTranslation();
  const formik = useFormik<FormFields>({
    initialValues: {
      summary: '',
      description: '',
    },
    validationSchema,
    onSubmit: ({ summary, description }, { setSubmitting }) => {
      gitCommit(`${summary}\n\n${description}`);
      setSubmitting(false);
      closeForm();
    },
  });
  const tree = useSelector(selectRepoTree);
  const commited = tree
    ? repoTree.search(
        tree,
        (node) =>
          checkStatus.isChanged(node.status) &&
          checkStatus.isStaged(node.status)
      )
    : [];
  return (
    <>
      <Button variant='outlined' fullWidth onClick={closeForm}>
        {t('common.go_back')}
      </Button>
      <Section>
        <Typography variant='h1' component='h2' mb={2}>
          {t('Changes.prompts.chosen')}:
        </Typography>
        <Box mb={2}>
          {commited.map((item) => (
            <ChangedFile item={item} key={item.filepath} noButton />
          ))}
        </Box>
      </Section>
      <form onSubmit={formik.handleSubmit}>
        <Section>
          <Styled.InputLabel
            id='summary-label'
            error={Boolean(formik.errors.summary)}
            typographyVariant='subtitle1'
          >
            {t('Changes.prompts.summary')}:
          </Styled.InputLabel>
          <TextField
            id='summary'
            aria-labelledby='summary-label'
            fullWidth
            placeholder={t(
              (formik.errors.summary as any) || 'Changes.placeholders.summary'
            )}
            error={Boolean(formik.errors.summary)}
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.setFieldValue('summary', e.target.value.trim());
              formik.handleBlur(e);
            }}
          />
          <Styled.InputLabel
            id='description-label'
            error={Boolean(formik.errors.description)}
            typographyVariant='subtitle1'
          >
            {t('Changes.prompts.description')}:
          </Styled.InputLabel>
          <TextArea
            id='description'
            aria-labelledby='description-label'
            fullWidth
            placeholder={t(
              (formik.errors.description as any) ||
                'Changes.placeholders.description'
            )}
            error={Boolean(formik.errors.description)}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.setFieldValue('description', e.target.value.trim());
              formik.handleBlur(e);
            }}
          />
        </Section>
        <Button
          disabled={!formik.isValid || !formik.touched.summary}
          type='submit'
          variant='contained'
          fullWidth
        >
          {t('Changes.buttons.finalize')}
        </Button>
      </form>
    </>
  );
};

export default CommitForm;
