import React from 'react';
import Button from '../../components/Button/Button';
import StyledSwitch from '../../components/Switch/Switch';

const TechnologiesPicker = () => {
    return (<div>
        <p>Would you like to use technology extensions?</p>
        <div><StyledSwitch checked={true}/> <p>SASS</p></div>
        <div><StyledSwitch checked={true}/><p>TYPESCRIPT</p></div>
        <Button>Test</Button>
        <Button>Test 1</Button>
    </div>);
}

export default TechnologiesPicker;