import React from "react";
import ImagePicker from '../../../components/ImagePicker/ImagePicker';
import TextField from '../../../components/TextField/TextField';
import TextArea from '../../../components/TextArea/TextArea';
import InputLabel from '../../../components/InputLabel/InputLabel';



export default function StepOne() {


    return (
        <div>
            <InputLabel color='error' typographyVariant='h3'>PROJECT PHOTO</InputLabel>
            <ImagePicker />
            <InputLabel color='error' typographyVariant='h3'>PROJECT NAME</InputLabel>
            <TextField />
            <InputLabel color='error' typographyVariant='h3'>PROJECT DECRIPTION</InputLabel>
            <TextArea />
        </div>
    )
}
