import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { altTheme } from '../../../../theme';
import CollabPicker from '../../../../components/CollabPicker/CollabPicker';
import CollabTable from '../../../../components/CollabTable/CollabTable';
import { collaborators as c } from '../../../../../shared/redux/slices/addPublicationSlice';

const AddColaborators = () => {
  const { t } = useTranslation();
  const collaborators = useSelector(c);
  const dispatch = useDispatch();

  const options = [
    {
      value: t('AddProject.AddCollaborators.programmer').toLocaleLowerCase(),
      label: t('AddProject.AddCollaborators.programmer'),
    },
    {
      value: t('AddProject.AddCollaborators.editor').toLocaleLowerCase(),
      label: t('AddProject.AddCollaborators.editor'),
    },
  ];

  function createCollaboratorRow(
    avatar: string,
    username: string,
    role: string
  ) {
    return { avatar, username, role };
  }

  /* const addColaborator = (c: Collaborator) => {
    const { avatar, username, role } = c;
    const collaborator = createCollaboratorRow(avatar, username, role);
    collaborators.push(collaborator);
  };

  const removeCollaborator = (i: number) => {
    collaborators.splice(i, 1);
    setCollaborators(collaborators);
  }; */

  return (
    <ThemeProvider theme={altTheme}>
      <Typography
        variant='h1'
        sx={{
          color: (theme) => theme.palette.text.primary,
          marginBottom: '5rem',
        }}
      >
        {t('AddProject.AddCollaborators.title')}
      </Typography>
      <CollabPicker
        options={options}
        buttonText={t(
          'AddProject.AddCollaborators.add_button'
        ).toLocaleUpperCase()}
        selectPlaceholder={t('AddProject.AddCollaborators.role')}
        textFieldPlaceholder={`${t('AddProject.AddCollaborators.username')}...`}
      />
      {collaborators && collaborators.length > 0 && (
        <>
          <Typography
            variant='h4'
            sx={{
              color: (theme) => theme.palette.text.primary,
              marginTop: '8.5rem',
              marginBottom: '2.7rem',
            }}
          >
            {t('AddProject.AddCollaborators.table_title').toLocaleUpperCase()}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <CollabTable collaborators={collaborators} />
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default AddColaborators;
