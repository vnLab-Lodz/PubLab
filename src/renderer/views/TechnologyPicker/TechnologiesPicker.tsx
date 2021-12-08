import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StyledSwitch from '../../components/Switch/Switch';
import './TechnologiesPicker.scss';

const TechnologiesPicker = () => {
  const { t, i18n } = useTranslation();
  let [useSCSS, changeUseSCSS] = useState(true);
  let [useTP, changeTP] = useState(true);

  return (
    <div className='container'>
      <h2>{t('technology-picker.message')}</h2>

      <div className='switches'>
        <div className='switch'>
          <StyledSwitch
            size='small'
            checked={useSCSS}
            onChange={() => {
              changeUseSCSS((useSCSS = !useSCSS));
            }}
          />
          <p className='inline'> SCSS</p>
        </div>
        <div>
          <StyledSwitch
            size='small'
            checked={useTP}
            onChange={() => {
              changeTP((useTP = !useTP));
            }}
          />
          <p className='inline'> TYPESCRIPT</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesPicker;
