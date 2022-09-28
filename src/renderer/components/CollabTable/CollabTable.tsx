import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { alpha, Avatar, IconButton, MenuItem, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Collaborator, USER_ROLES } from 'src/shared/types';
import { selectCurrentUserData } from 'src/shared/redux/slices/currentUserSlice';
import * as Styled from './style';
import TableCell from '../TableCell/TableCell';
import Select from '../Select/Select';

interface Props {
  collaborators: Collaborator[];
  onDelete: (id: string) => void;
  isDeleteDisabled?: boolean;
  onCurrentUserRoleChange: (data: Collaborator) => void;
  roleOptions: { value: USER_ROLES; label: string }[];
}

const CollabTable: React.FC<Props> = ({
  collaborators,
  onDelete,
  isDeleteDisabled,
  onCurrentUserRoleChange,
  roleOptions,
}) => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUserData);

  return (
    <Styled.Container>
      <Table
        aria-label='collaborators table'
        sx={{ width: 'calc(100% - 1px)' }} // -1px fixes the missing rightmost border
      >
        <TableHead>
          <Styled.Row>
            <TableCell />
            <TableCell>
              <Typography variant='caption'>
                {t('AddProject.AddCollaborators.username').toLocaleUpperCase()}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='caption'>
                {t('AddProject.AddCollaborators.role').toLocaleUpperCase()}
              </Typography>
            </TableCell>
          </Styled.Row>
        </TableHead>
        <TableBody>
          {collaborators &&
            collaborators.map((collaborator) => {
              const isCurrentUser = user?.nick === collaborator.githubUsername;
              return (
                <Styled.Row key={collaborator.id}>
                  <TableCell align='center' width='3rem'>
                    <Avatar
                      sx={{
                        width: '2.5rem',
                        height: '2.5rem',
                        fontSize: '1.3rem',
                      }}
                    >
                      {collaborator.githubUsername.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell border>{collaborator.githubUsername}</TableCell>
                  <TableCell border noPadding={isCurrentUser}>
                    {isCurrentUser ? (
                      <Select
                        value={collaborator.role}
                        onChange={(e) =>
                          onCurrentUserRoleChange({
                            ...collaborator,
                            role: e.target.value,
                          })
                        }
                        fullWidth
                        sx={(theme) => ({
                          '&&& .MuiSelect-select': {
                            padding: ' 0.5rem',
                            fontSize: theme.typography.body2.fontSize,
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        })}
                      >
                        {roleOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      t(
                        `AddProject.AddCollaborators.${collaborator.role}` as any
                      )
                    )}
                  </TableCell>
                  <TableCell width='3rem' />
                  <TableCell
                    border
                    align='center'
                    width='3rem'
                    sx={{ borderLeft: '1px solid' }}
                  >
                    <IconButton
                      disabled={
                        collaborator.githubUsername === user?.nick ||
                        isDeleteDisabled
                      }
                      color='primary'
                      size='small'
                      aria-label='delete collaborator'
                      onClick={() => onDelete(collaborator.id)}
                      sx={(theme) => ({
                        cursor: 'pointer',
                        '&:disabled': {
                          color: alpha(theme.palette.text.primary, 0.3),
                        },
                      })}
                    >
                      <ClearIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                </Styled.Row>
              );
            })}
        </TableBody>
      </Table>
    </Styled.Container>
  );
};

CollabTable.defaultProps = {
  isDeleteDisabled: false,
};

export default CollabTable;
