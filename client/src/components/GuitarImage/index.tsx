import style from './style.module.css';

export default function GuitarImage({alt, src}: {alt?: string, src?: string}){
    return (
        <img className={style['guitar-image']} alt={alt} src={src} />
    );
}