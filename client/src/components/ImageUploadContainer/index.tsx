import React from 'react';
import styles from './style.module.css';

/**
 * flex container that holds ImageUpload component
 * @returns ImageUploadContainer
 */
export default function ImageUploadContainer({children}: {children: React.ReactNode}){
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}