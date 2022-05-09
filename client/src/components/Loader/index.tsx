import React from 'react';
import style from './style.module.css';
import withTooltip from '../withTooltip';

function Loader(){
    return <div className={style.loader}></div>;
}

export default withTooltip(Loader)('loading model');