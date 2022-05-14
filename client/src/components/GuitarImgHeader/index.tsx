import GuitarImg from "../GuitarImg";
import withTooltip from "../withTooltip";
import { Guitar } from "../../contexts/GuitarContext";
import { curryComponent } from "../../util";

const GuitarImgWithTooltip = withTooltip(GuitarImg);

export default function GuitarImgHeader({guitarType, src}: {guitarType: Guitar, src: string}){
    const curried = curryComponent(GuitarImgWithTooltip, {text: '', alt: '', src: ''})
                    ({alt: guitarType})({src: src});
    switch (guitarType) {
        case 'strat':
            return curried({text: 'Stratocaster\ngenre: hard-rock, blues'});
        case 'tele':
            return curried({text: 'Telecaster\ngenre: blues, jazz'});
        case 'lespaul':
            return curried({text: 'Les Paul\ngenre: heavy-metal, metal'});
        case 'sg':
            return curried({text: 'SG\ngenre: metal, hard-rock'});
        default:
            throw new Error('No guitarType found');
    }
}