import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../Section/Section';
import * as Snippet from './Snippet';
import { PlainUl } from '../List/List';
import { Publication } from '../../../shared/types';

interface Props {
  project: Publication;
  noLabel?: boolean;
  isAccordion?: boolean;
}

const mockSnippets = [
  {
    id: '23124',
    name: 'Snippet 1',
    code: `<video width=„640” height=„360” controls>
        <source src=„__VIDEO__.MP4” type=„video/mp4” /> 
        <source src=„__VIDEO__.OGV” type=„video/ogg” /> 
        <object width=„640” height=„360” type=„application/x-shockwave-flash” data=„__FLASH__.SWF”> 
            <param name=„movie” value=„__FLASH__.SWF” /> 
            <param name=„flashvars” value=„controlbar=over&amp;image=__POSTER__.JPG&amp;file=__VIDEO__.MP4” />
            
            <img src=„__VIDEO__.JPG” width=„640” height=„360” alt=„__TITLE__” 
                title=„No video playback capabilities, please download the video below” /> 
        </object> 
    </video>`,
  },
  {
    id:'3131231',
    name: 'Snippet o długiej nazwie, która nie mieści się w jednym wierszu',
    code: `<video width=„640” height=„360” controls>
        <source src=„__VIDEO__.MP4” type=„video/mp4” /> 
        <source src=„__VIDEO__.OGV” type=„video/ogg” /> 
        <object width=„640” height=„360” type=„application/x-shockwave-flash” data=„__FLASH__.SWF”> 
            <param name=„movie” value=„__FLASH__.SWF” /> 
            <param name=„flashvars” value=„controlbar=over&amp;image=__POSTER__.JPG&amp;file=__VIDEO__.MP4” />
            
            <img src=„__VIDEO__.JPG” width=„640” height=„360” alt=„__TITLE__” 
                title=„No video playback capabilities, please download the video below” /> 
        </object> 
    </video>`,
  },
];

const Snippets = ({ project, noLabel, isAccordion }: Props) => {
  const { t } = useTranslation();

  return (
    <Section mt={0} mb={2}>
      {!noLabel && (
        <Typography variant='caption' component='h2' mb={2}>
          {t('publication.snippets').toLocaleUpperCase()}:
        </Typography>
      )}
      <PlainUl>
        {mockSnippets.map((snippet, index) => (
          <li key={snippet.id}>
            {isAccordion ? (
              <Snippet.Accordion snippet={snippet} index={index} />
            ) : (
              <Snippet.Plain snippet={snippet} />
            )}
          </li>
        ))}
      </PlainUl>
    </Section>
  );
};

Snippets.defaultProps = {
  noLabel: false,
  isAccordion: false,
};

export default Snippets;
