import React from 'react';
import style from './style.module.css';

export default function GuitarColumn({head, children}: {head?: React.ReactNode, children?: React.ReactNode}){
    return (
        <div className={style.container}>
            {head}
            <div className={style.scrollable}>
                {children}
            </div>
        </div>
    );
}