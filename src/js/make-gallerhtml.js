



export  function makeListElements(array) {
    const itemOfGallery = array.map(({preview, original, description}) =>
    `<li class="gallery__item"><img class="js-gallery_image gallery__image" src="${preview}" alt="${description}"></li>`
    ).join('')
    return itemOfGallery;
};