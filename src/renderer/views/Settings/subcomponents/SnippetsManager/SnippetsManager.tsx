import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Publication, Snippet } from '../../../../../shared/types';
import Button from '../../../../components/Button/Button';
import CloseButton from '../../../../components/CloseButton/CloseButton';
import { PlainUl } from '../../../../components/List/List';
import TextArea from '../../../../components/TextArea/TextArea';
import * as Styled from './style';

type State = Pick<Publication, 'snippets'>;

interface Props {
  onSubmit: (state: State) => void;
  state: State;
}

export default function SnippetsManager({ onSubmit, state }: Props) {
  const { t } = useTranslation();
  const snippets = state.snippets || [];

  function updateSnippet(change: Partial<Snippet>, index: number): State {
    const output = [...snippets];
    output[index] = { ...output[index], ...change };
    return { snippets: output };
  }
  return (
    <>
      <Typography variant='body2' component='p'>
        {t('publication.snippets').toLocaleUpperCase()}:
      </Typography>
      <PlainUl sx={{ my: 2 }}>
        {snippets.map((snippet, index) => (
          <Styled.ListItem key={`snippet_${snippet.id}`}>
            <Styled.SnippetHeader>
              <Typography variant='caption' component='p'>
                {`${t('common.name')} / ${t(
                  'common.code'
                )}`.toLocaleUpperCase()}
              </Typography>
              <CloseButton
                aria-label={t('common.delete')}
                onClick={() =>
                  onSubmit({
                    snippets: [
                      ...snippets.slice(0, index),
                      ...snippets.slice(index + 1),
                    ],
                  })
                }
              />
            </Styled.SnippetHeader>

            <Styled.SnippetName
              value={snippets[index].name}
              onChange={(e) =>
                onSubmit(updateSnippet({ name: e.target.value }, index))
              }
            />
            <TextArea
              value={snippets[index].code}
              onChange={(e) =>
                onSubmit(updateSnippet({ code: e.target.value }, index))
              }
            />
          </Styled.ListItem>
        ))}
      </PlainUl>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={() =>
          onSubmit({
            snippets: [
              ...snippets,
              {
                id: uuidv4(),
                name: `${t('ProjectSettings.snippet')} ${snippets.length + 1}`,
                code: '',
              },
            ],
          })
        }
        sx={{ m: 0 }}
      >
        {t('common.add')}
      </Button>
    </>
  );
}
