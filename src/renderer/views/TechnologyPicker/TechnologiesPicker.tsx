import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import StyledSwitch from '../../components/Switch/Switch';

const TechnologiesPicker = () => {
    const { t, i18n } = useTranslation();

    return (<div>
        <p>{t('technology-picker.message')}</p>
        <div><StyledSwitch checked={true}/> <p>SASS</p></div>
        <div><StyledSwitch checked={true}/><p>TYPESCRIPT</p></div>
        <Button>{t('technology-picker.back-button')}</Button>
        <Button>{t('technology-picker.next-button')}</Button>
    </div>);
}

export default TechnologiesPicker;