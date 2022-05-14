import GuitarImg from "../GuitarImg";
import withTooltip from "../withTooltip";
import { Guitar } from "../../contexts/GuitarContext";


const GuitarImgWithTooltip = withTooltip(GuitarImg);

export default function GuitarImgHeader({guitarType, src}: {guitarType: Guitar, src: string}){
    switch (guitarType) {
        case 'strat':
            return <GuitarImgWithTooltip text={'Stratocaster\ngenre: '} />
        case 'tele':
            return <GuitarImgWithTooltip text={'Stratocaster\ngenre: '} />
        case 'lespaul':
            return <GuitarImgWithTooltip text={'Stratocaster\ngenre: '} />
        case 'sg':
            return <GuitarImgWithTooltip text={'Stratocaster\ngenre: '} />
        default:
            throw new Error('No guitarType found');
    }
}