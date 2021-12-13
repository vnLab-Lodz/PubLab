import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar, Typography } from '@mui/material';
import * as Styled from './style';
import { Collaborator } from '../../../shared/redux/slices/loadPublicationsSlice';
import { deleteCollaborator } from '../../../shared/redux/slices/addPublicationSlice';

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
      <Table aria-label='collaborators table'>
        <TableHead>
          <Styled.Row>
            <Styled.BorderedTC />
            <Styled.BorderedTC>
              <Typography variant='h5'>
                {t('AddProject.AddCollaborators.username').toLocaleUpperCase()}
              </Typography>
            </Styled.BorderedTC>
            <Styled.BorderedTC>
              <Typography variant='h5'>
                {t('AddProject.AddCollaborators.role').toLocaleUpperCase()}
              </Typography>
            </Styled.BorderedTC>
          </Styled.Row>
        </TableHead>
        <TableBody>
          {collaborators &&
            collaborators.map((collaborator) => (
              <Styled.Row key={collaborator.id}>
                <Styled.BorderedTC align='center' width='30px'>
                  <Avatar sx={{ width: 25, height: 25, fontSize: '1.3rem' }}>
                    {collaborator.githubUsername.charAt(0)}
                  </Avatar>
                </Styled.BorderedTC>
                <Styled.BorderedTC border usernameColumn width='255px'>
                  {collaborator.githubUsername}
                </Styled.BorderedTC>
                <Styled.BorderedTC border width='255px'>
                  {collaborator.role}
                </Styled.BorderedTC>
                <Styled.BorderedTC width='30px' />
                <Styled.BorderedTC
                  border
                  align='center'
                  width='30px'
                  onClick={() => handleDelete(collaborator.id)}
                >
                  <Styled.Icon />
                </Styled.BorderedTC>
              </Styled.Row>
            ))}
        </TableBody>
      </Table>
    </Styled.Container>
  );
};

export default CollabTable;
