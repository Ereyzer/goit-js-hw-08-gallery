import photos from './gallery-items';
import {refs} from '../index';
import {makeBigPhoto} from './open-modal';



export const indexOfBigImg = () => {
    for(let i = 0; i < photos.length; i += 1){
        if (photos[i].description === refs.bigImg.alt) {
            return i;
        }  
    }
};


export function scrollRight() {
    let index = indexOfBigImg() + 1;
    if(index === photos.length){
        index = 0;
    }

    makeBigPhoto(photos[index])
}

export function scrollLeft() {
    let index = indexOfBigImg() - 1;
    if(index === -1){
        index = photos.length - 1;
    }
    makeBigPhoto(photos[index])
}

