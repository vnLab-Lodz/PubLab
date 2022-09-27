import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { Collaborator, Publication, USER_ROLES } from 'src/shared/types';
import CollabPicker from '../CollabPicker/CollabPicker';
import CollabTable from '../CollabTable/CollabTable';
import usePromiseSubscription from '../../hooks/usePromiseSubscription';
import { getPublicUserData } from '../../ipc';
import i18n from '../../internationalisation/i18next';

type State = Pick<Publication, 'collaborators'>;

interface Props {
  onAdd: (value: Collaborator) => void;
  onDelete: (id: string) => void;
  state: State;
  compact?: boolean;
  disabled?: boolean;
}

const CollaboratorsPicker = ({
  onAdd,
  onDelete,
  state,
  compact,
  disabled,
}: Props) => {
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

  const [shouldRunVerification, runVerification] = React.useState(false);
  const [verifiedUsername, verificationError, verificationPending] =
    usePromiseSubscription(
      async () => {
        if (!shouldRunVerification || !currentCollaborator.username) {
          if (verificationError) throw new Error(verificationError.message); // persist error message
          return undefined;
        }
        const { data: userData } = await getPublicUserData(
          currentCollaborator.username
        );
        if (
          state.collaborators.some(
            (collaborator) => collaborator.githubUsername === userData.login
          )
        ) {
          throw new Error('duplicate');
        }
        return (userData.login as string) || undefined;
      },
      undefined,
      [shouldRunVerification]
    );
  useEffect(() => {
    runVerification(false);
    if (verificationError) return;
    if (verifiedUsername) {
      onAdd({
        id: uuid(),
        githubUsername: verifiedUsername,
        role: currentCollaborator.role as USER_ROLES,
      });
      setCurrentCollaborator({ username: '', role: '' });
    }
  }, [verifiedUsername, verificationError]);

  const Picker = disabled ? (
    <Typography variant='body2'>
      {t('AddProject.AddCollaborators.not_owner_msg')}
    </Typography>
  ) : (
    <CollabPicker
      value={currentCollaborator}
      prompt={getPrompt(verificationError?.message, verificationPending)}
      isError={!!verificationError && !verificationPending}
      onChange={(value) =>
        setCurrentCollaborator(value || { username: '', role: '' })
      }
      onAdd={() => {
        runVerification(true);
      }}
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
            isDeleteDisabled={disabled}
          />
        </Box>
      )}
      {compact && Picker}
    </>
  );
};

CollaboratorsPicker.defaultProps = {
  compact: false,
  disabled: false,
};

export default CollaboratorsPicker;

function getPrompt(message: string | undefined, isPending: boolean) {
  if (!message) return undefined;
  if (isPending)
    return i18n.t('AddProject.AddCollaborators.username_verification_pending');
  if (message === 'duplicate')
    return i18n.t('AddProject.AddCollaborators.user_exists_prompt');
  return i18n.t('AddProject.AddCollaborators.wrong_username_prompt');
}
