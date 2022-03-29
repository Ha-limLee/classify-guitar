import React from 'react';

export default function ImageUpload({onChange}: {onChange?: React.ChangeEventHandler<HTMLInputElement>}){
    return (
        <input type='file' name='imgs' accept='image/*' onChange={onChange} multiple={true}>
        </input>
    );
}