import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { Collaborator, Publication, USER_ROLES } from 'src/shared/types';
import CollabPicker, { Value } from '../CollabPicker/CollabPicker';
import CollabTable from '../CollabTable/CollabTable';

type State = Pick<Publication, 'collaborators'>;

interface Props {
  onAdd: (value: Collaborator) => void;
  onDelete: (id: string) => void;
  state: State;
  compact?: boolean;
}

const CollaboratorsPicker = ({ onAdd, onDelete, state, compact }: Props) => {
  const { t } = useTranslation();

  const [currentCollaborator, setCurrentCollaborator] = React.useState({
    username: '',
    role: '',
  });

  const options = [
    {
      value: USER_ROLES.DEVELOPER,
      label: t('AddProject.AddCollaborators.developer'),
    },
    {
      value: USER_ROLES.EDITOR,
      label: t('AddProject.AddCollaborators.editor'),
    },
  ];

  const handleAdd = (value: Value) => {
    onAdd({
      id: uuid(),
      githubUsername: value.username,
      role: value.role as USER_ROLES,
    });
  };

  const Picker = (
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
  );

  return (
    <>
      {compact ? (
        <Typography variant='body2' component='p' mb={2}>
          {t('publication.collaborators').toLocaleUpperCase()}:
        </Typography>
      ) : (
        <Typography variant='subtitle1' component='p' mb={3}>
          {t('AddProject.AddCollaborators.title')}
        </Typography>
      )}
      {!compact && Picker}
      {state.collaborators && state.collaborators.length > 0 && (
        <Box mt={compact ? 0 : 4} mb={compact ? 3 : 0}>
          {!compact && (
            <Typography
              variant='body2'
              component='p'
              sx={{
                color: (theme) => theme.palette.text.primary,
                marginBottom: 2,
              }}
            >
              {t('AddProject.AddCollaborators.table_title').toLocaleUpperCase()}
            </Typography>
          )}
          <CollabTable
            collaborators={state.collaborators}
            onDelete={onDelete}
          />
        </Box>
      )}
      {compact && Picker}
    </>
  );
};

CollaboratorsPicker.defaultProps = {
  compact: false,
};

export default CollaboratorsPicker;
