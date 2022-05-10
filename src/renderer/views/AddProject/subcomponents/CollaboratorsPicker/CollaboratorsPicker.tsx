import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { Collaborator, Publication, USER_ROLES } from 'src/shared/types';
import CollabPicker, {
  Value,
} from '../../../../components/CollabPicker/CollabPicker';
import CollabTable from '../../../../components/CollabTable/CollabTable';

type State = Pick<Publication, 'collaborators'>;

interface Props {
  onAdd: (value: Collaborator) => void;
  onDelete: (id: string) => void;
  state: State;
}

const CollaboratorsPicker = ({ onAdd, onDelete, state }: Props) => {
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
      {state.collaborators && state.collaborators.length > 0 && (
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
          <CollabTable
            collaborators={state.collaborators}
            onDelete={onDelete}
          />
        </>
      )}
    </>
  );
};

export default CollaboratorsPicker;
