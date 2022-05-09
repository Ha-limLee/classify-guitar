import React from 'react';
import style from './style.module.css';

export default function Tooltip({text, children}: {text: string, children: React.ReactNode}){
    return (
        <div className={style.tooltip}>
            {children}
            <span className={style.tooltiptext}>{text}</span>
        </div>
    );
}
