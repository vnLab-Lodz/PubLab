import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import * as Styled from './style';
import { Collaborator } from '../../../shared/redux/slices/loadPublicationsSlice';
import { deleteCollaborator } from '../../../shared/redux/slices/addPublicationWizardSlice';

interface Props {
  collaborators: Collaborator[];
}

const CollabTable: React.FC<Props> = ({ collaborators }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteCollaborator(id));
  };

  return (
    <Styled.Container>
      <Table
        aria-label='collaborators table'
        sx={{ width: 'calc(100% - 1px)' }} // -1px fixes the missing rightmost border
      >
        <TableHead>
          <Styled.Row>
            <Styled.BorderedTC />
            <Styled.BorderedTC>
              <Typography variant='caption'>
                {t('AddProject.AddCollaborators.username').toLocaleUpperCase()}
              </Typography>
            </Styled.BorderedTC>
            <Styled.BorderedTC>
              <Typography variant='caption'>
                {t('AddProject.AddCollaborators.role').toLocaleUpperCase()}
              </Typography>
            </Styled.BorderedTC>
          </Styled.Row>
        </TableHead>
        <TableBody>
          {collaborators &&
            collaborators.map((collaborator) => (
              <Styled.Row key={collaborator.id}>
                <Styled.BorderedTC align='center' width='3rem'>
                  <Avatar
                    sx={{
                      width: '2.5rem',
                      height: '2.5rem',
                      fontSize: '1.3rem',
                    }}
                  >
                    {collaborator.githubUsername.charAt(0)}
                  </Avatar>
                </Styled.BorderedTC>
                <Styled.BorderedTC border usernameColumn>
                  {collaborator.githubUsername}
                </Styled.BorderedTC>
                <Styled.BorderedTC border>
                  {t(`AddProject.AddCollaborators.${collaborator.role}` as any)}
                </Styled.BorderedTC>
                <Styled.BorderedTC width='3rem' />
                <Styled.BorderedTC border align='center' width='3rem'>
                  <IconButton
                    color='primary'
                    size='small'
                    aria-label='delete collaborator'
                    onClick={() => handleDelete(collaborator.id)}
                  >
                    <ClearIcon fontSize='inherit' />
                  </IconButton>
                </Styled.BorderedTC>
              </Styled.Row>
            ))}
        </TableBody>
      </Table>
    </Styled.Container>
  );
};

export default CollabTable;
