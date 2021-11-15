import * as React from 'react';
import './CollabPicker.scss';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material';
import { useState } from 'react';

interface Value {
    username: string;
    role: number;
}

interface Options {
    value: Value;
    label: string;
}

interface Props {
    value?: Value;
    options?: Options;
    onChange?: (...args: any[]) => void;
}

const CollabPicker: React.FC<Props> = ({ options, onChange }) => {
    [username, onChange] = useState("");
    const array = [
        { role: value?.ro, label: string }
    ]
    return <div>
        <TextField placeholder='Username...' value={name} error={false} onChange={onChange} />
        <Select label="Role">
            {
                array.map(({ role, label }) => <MenuItem value={role}>{label}</MenuItem>)
            }
        </Select>
        <Button>ADD</Button>
    </div>;
};

CollabPicker.defaultProps = {
    value: undefined,
    options: undefined,
    onChange: () => { },
};

export default CollabPicker;
