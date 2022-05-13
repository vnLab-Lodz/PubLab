import { Box, Chip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../../../shared/types';
import Button from '../../../../components/Button/Button';
import { PlainUl } from '../../../../components/List/List';
import TextField from '../../../../components/TextField/TextField';

type State = Pick<Publication, 'tags'>;

interface Props {
  onSubmit: (state: State) => void;
  state: State;
}

export default function TagsManager({ onSubmit, state }: Props) {
  const { t } = useTranslation();
  const [tagInput, setTagInput] = useState('');
  return (
    <>
      <Typography variant='body2' component='p'>
        {t('publication.tags').toLocaleUpperCase()}:
      </Typography>
      <PlainUl sx={{ mb: 2 }}>
        {state.tags.map((tag, index) => (
          <li key={`tag_${tag}`} style={{ display: 'inline' }}>
            <Chip
              size='medium'
              label={tag}
              sx={{ mr: '1rem', mt: '1rem' }}
              onDelete={() =>
                onSubmit({
                  tags: [
                    ...state.tags.slice(0, index),
                    ...state.tags.slice(index + 1),
                  ],
                })
              }
            />
          </li>
        ))}
      </PlainUl>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          sx={{ flexGrow: 1, borderRight: 'none' }}
          placeholder={t('ProjectSettings.input_tag')}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => onSubmit({ tags: [...state.tags, tagInput] })}
          sx={{ m: 0 }}
          disabled={state.tags.includes(tagInput) || tagInput === ''}
        >
          {t('common.add')}
        </Button>
      </Box>
    </>
  );
}
