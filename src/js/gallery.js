











function addIsOpen(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    };
    makeBigPhoto(bigSizeOfImage(event.target));
    refs.lightbox.classList.add('is-open');
    window.addEventListener('keydown', checkKeyboardEvent);
    refs.overlay.addEventListener('click', removeIsOpen);
    refs.closeBtn.addEventListener('click', removeIsOpen);
    refs.galleryList.removeEventListener('click', addIsOpen);
    document.body.style.overflow = "hidden"; // ADD THIS LINE
    document.body.style.height = "100%"; // ADD THIS LINE
};

function removeIsOpen(event) {
    window.removeEventListener('keydown', checkKeyboardEvent);
    refs.closeBtn.removeEventListener('click', removeIsOpen);
    refs.overlay.removeEventListener('click', removeIsOpen);
    refs.galleryList.addEventListener('click', addIsOpen);
    refs.lightbox.classList.remove('is-open');
    refs.bigImg.src = '';
    refs.bigImg.alt = '';
    document.body.style.overflow = ""; // ADD THIS LINE
    document.body.style.height = "";
};

function checkKeyboardEvent(event) {
    if (event.code === 'ArrowLeft') {
        scrollLeft()
    }else if (event.code === 'ArrowRight') {
        scrollRight();
    }else if (event.code === 'Escape'){
        removeIsOpen(event);
    }else{
        return;
    }
};

const indexOfBigImg = () => {
    for(let i = 0; i < photos.length; i += 1){
        if (photos[i].description === refs.bigImg.alt) {
            return i;
        }  
    }
};


function scrollRight() {
    let index = indexOfBigImg() + 1;
    if(index === photos.length){
        index = 0;
    }

    makeBigPhoto(photos[index])
}

function scrollLeft() {
    let index = indexOfBigImg() - 1;
    if(index === -1){
        index = photos.length - 1;
    }
    makeBigPhoto(photos[index])
}

function makeBigPhoto(bigPhoto) {
    refs.bigImg.src = `${bigPhoto.original}`;
    refs.bigImg.alt = `${bigPhoto.description}`;
};
const  bigSizeOfImage = (currentImg) => photos.find(img => img.description === currentImg.alt);

