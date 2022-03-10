import React, {useState} from 'react';

function handleFiles(e: React.ChangeEvent<HTMLInputElement>){
    const imgs = e.target.files;
    const formData = new FormData();
    if (imgs) {
        for (let i = 0; i < imgs.length; i++){
            formData.append('img', imgs[i]);
            console.log(i);
        }
        console.log(formData.getAll('img'));
        // todo: send formData to server using fetch api
        // have to figure out what url fetch api will receive
        // url will not be the localhost on the heroku
    }
}

export default function ImageUpload(){
    return (
        <>
            <input type='file' name='imgs' accept='image/*' onChange={handleFiles} multiple={true}>
            </input>
        </>
    );
}