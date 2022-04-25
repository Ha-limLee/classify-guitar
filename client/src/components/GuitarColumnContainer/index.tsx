import React from 'react';
import style from './style.module.css';

export default function GuitarColumnContainer({children}: {children: React.ReactNode}){
    return (
        <div className={style.container}>
            {children}
        </div>
    )
}