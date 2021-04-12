import photos from './gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
    bigImg: document.querySelector('.lightbox__image'),
    galleryItem: document.querySelector('.js-gallery_image'),
    overlay: document.querySelector('.lightbox__overlay'),
}

refs.galleryList.addEventListener('click', addIsOpen);
refs.closeBtn.addEventListener('click', removeIsOpen);



function makeListElements(array) {
    const itemOfGallery = array.map(({preview, description}) =>
        `<li class="gallery__item"><img class="js-gallery_image gallery__image" src="${preview}" alt="${description}"></li>`
    ).join('')
    return itemOfGallery;
};

refs.galleryList.insertAdjacentHTML('beforeend', `${makeListElements(photos)}`)

function addIsOpen(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }  
    
    openBigPhoto(event);
    refs.lightbox.classList.add('is-open');
    window.addEventListener('keydown', checkKeyboardEvent);
    refs.overlay.addEventListener('click', removeIsOpen);
    refs.galleryList.removeEventListener('click', addIsOpen);
};

function removeIsOpen(event) {
console.log(event);
    window.removeEventListener('keydown', checkKeyboardEvent);
    refs.overlay.removeEventListener('click', removeIsOpen);
    refs.galleryList.addEventListener('click', addIsOpen);
    refs.lightbox.classList.remove('is-open');
    refs.bigImg.src = '';
    refs.bigImg.alt = '';
};

function checkKeyboardEvent(event) {
    if (event.code === 'ArrowLeft') {
        scrollLeft(event)
    }else if (event.code === 'ArrowRight') {
        scrollRight(event);
    }else if (event.code === 'Escape'){
        removeIsOpen(event);
    }else{
        return;
    }
};
const indexOfBigImg = () => photos.reduce((acc, img, index) => {

        if (img.description === refs.bigImg.alt) {
            acc = index;
        }
        return acc;
    },0);



function openBigPhoto(event) {
    const bigPhoto = bigSizeOfImage(event.target);
    refs.bigImg.src = `${bigPhoto.original}`;
    refs.bigImg.alt = `${bigPhoto.description}`;
}

function scrollRight(event) {
    let index = indexOfBigImg() + 1;
    if(index === photos.length){

        index = 0;
    }

    const bigPhoto = photos[index];

    refs.bigImg.src = `${bigPhoto.original}`;
    refs.bigImg.alt = `${bigPhoto.description}`;
}

function scrollLeft(event) {
    let index = indexOfBigImg() - 1;
    if(index === -1){
        console.log(photos.length);
        index = photos.length - 1;
    }
    const bigPhoto = photos[index];  
    refs.bigImg.src = `${bigPhoto.original}`;
    refs.bigImg.alt = `${bigPhoto.description}`;
}

const  bigSizeOfImage = (currentImg) => photos.find(img => img.description === currentImg.alt);

