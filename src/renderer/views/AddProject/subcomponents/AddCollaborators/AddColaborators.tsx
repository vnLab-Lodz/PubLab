import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { altTheme } from '../../../../theme';
import CollabPicker, {
  Value,
} from '../../../../components/CollabPicker/CollabPicker';
import CollabTable from '../../../../components/CollabTable/CollabTable';
import {
  addCollaborator,
  collaborators as selectCollaborators,
} from '../../../../../shared/redux/slices/addPublicationSlice';

const AddColaborators = () => {
  const { t } = useTranslation();
  const collaborators = useSelector(selectCollaborators);
  const dispatch = useDispatch();
  const [currentCollaborator, setCurrentCollaborator] = React.useState({
    username: '',
    role: '',
  });

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

  const handleAdd = (value: Value) => {
    dispatch(
      addCollaborator({
        id: uuid(),
        githubUsername: value.username,
        role: value.role,
      })
    );
  };

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
        value={currentCollaborator}
        onChange={() => setCurrentCollaborator(currentCollaborator)}
        onAdd={handleAdd}
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
          <CollabTable collaborators={collaborators} />
        </>
      )}
    </ThemeProvider>
  );
};

export default AddColaborators;
