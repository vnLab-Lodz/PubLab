import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import CollabPicker, {
  Value,
} from '../../../../components/CollabPicker/CollabPicker';
import CollabTable from '../../../../components/CollabTable/CollabTable';
import {
  addCollaborator,
  collaborators as selectCollaborators,
} from '../../../../../shared/redux/slices/addPublicationSlice';

const CollaboratorsPicker = () => {
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
    <>
      <Typography variant='subtitle1' component='p' mb={3}>
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
            variant='body2'
            component='p'
            sx={{
              color: (theme) => theme.palette.text.primary,
              marginTop: 4,
              marginBottom: 2,
            }}
          >
            {t('AddProject.AddCollaborators.table_title').toLocaleUpperCase()}
          </Typography>
          <CollabTable collaborators={collaborators} />
        </>
      )}
    </>
  );
};

export default CollaboratorsPicker;
