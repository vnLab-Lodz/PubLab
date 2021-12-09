import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { newPublication, setPublicationField } from '../../../shared/redux/slices/addPublicationSlice';
import StyledSwitch from '../../components/Switch/Switch';
import './TechnologiesPicker.scss';

const TechnologiesPicker = () => {
  const { t } = useTranslation();
  const { useSass, useTypescript } = useSelector(newPublication);
  const dispatch = useDispatch();

  const toggleSass = () => {
    dispatch(setPublicationField({ field: 'useSass', value: !useSass }));
  };

  const toggleTypescript = () => {
    dispatch(setPublicationField({ field: 'useTypescript', value: !useTypescript }));
  };

  return (
    <div className='container'>
      <h2>{t('technology-picker.message')}</h2>

      <div className='switches'>
        <div className='switch'>
          <StyledSwitch
           size='small'
           checked={useSass}
           onChange={toggleSass}
          />
          <p className='inline'> SCSS</p>
        </div>
        <div>
          <StyledSwitch
           size='small'
           checked={useTypescript}
           onChange={toggleTypescript}
          />
          <p className='inline'> TYPESCRIPT</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesPicker;
