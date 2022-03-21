import React from 'react';
import style from './index.module.css';

export default function GuitarImg({alt, src}: {alt?: string, src?: string}){
    return (
        <img className={style.guitarimg} alt={alt} src={src} />
    );
}