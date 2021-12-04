import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import StyledSwitch from '../../components/Switch/Switch';
import './TechnologiesPicker.scss';

const TechnologiesPicker = () => {
    const { t, i18n } = useTranslation();

    return (<div className='container'>
        <h2>{t('technology-picker.message')}</h2>
        
        <div className='switches'>
        <div className='switch'><StyledSwitch/><p className='inline'> SCSS</p></div>
        <div><StyledSwitch/><p className='inline'> TYPESCRIPT</p ></div>
        </div>

        <div>
        <Button>{t('technology-picker.back-button')}</Button>
        <Button>{t('technology-picker.next-button')}</Button>
        </div>
    </div>);
}

export default TechnologiesPicker;