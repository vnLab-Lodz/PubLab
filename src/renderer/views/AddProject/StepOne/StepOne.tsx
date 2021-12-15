import React, { useState } from "react";
import ImagePicker from '../../../components/ImagePicker/ImagePicker';
import TextField from '../../../components/TextField/TextField';
import TextArea from '../../../components/TextArea/TextArea';
import InputLabel from '../../../components/InputLabel/InputLabel';



export default function StepOne() {

    const [imagePickerError, setImagePickerError] = useState(false)
    const [nameInputError, setNameInputError] = useState(false)
    const [descInputError, setDescInputError] = useState(false)

    const handleImageValidation = () => {
        setImagePickerError(true)
    }

    const handleNameValidation = (input: string) => {
        input === '' ? setNameInputError(true) : setNameInputError(false)
    }

    const handleDescValidation = (input: string) => {
        input === '' ? setDescInputError(true) : setDescInputError(false)

    }

    //fless block
    return (
        <div>
            <InputLabel error={imagePickerError} typographyVariant='h3'>PROJECT PHOTO</InputLabel>
            <ImagePicker error={imagePickerError} onClick={() => handleImageValidation()} />
            <InputLabel error={nameInputError} typographyVariant='h3'>PROJECT NAME</InputLabel>
            <TextField error={nameInputError} onChange={(e) => handleNameValidation(e.target.value)} />
            <InputLabel error={descInputError} typographyVariant='h3'>PROJECT DECRIPTION</InputLabel>
            <TextArea error={descInputError} onChange={(e) => handleDescValidation(e.target.value)} />
        </div>
    )
}
