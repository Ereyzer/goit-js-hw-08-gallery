export const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
    bigImg: document.querySelector('.lightbox__image'),
    galleryItem: document.querySelector('.js-gallery_image'),
    overlay: document.querySelector('.lightbox__overlay'),
}
import photos from './js/gallery-items';
import {makeListElements} from './js/make-gallerhtml';
import { addIsOpen} from './js/open-modal';

refs.galleryList.addEventListener('click', addIsOpen);
refs.galleryList.innerHTML = `${makeListElements(photos)}`;

