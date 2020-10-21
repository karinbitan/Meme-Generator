'use strict';

function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
    renderEditor();
    renderGallery();
}

function renderEditor(){
    var strHTML = '';
    strHTML = `<input type='text' onchange='getText(this.value)' /> <button onclick="drawText()">Text</button>`
    document.querySelector('.editor').innerHTML = strHTML;
}

function renderGallery(){
    var imgs = gImgs;
    var strHTML = imgs.map(function(img){
        return `'<img src='${img.url}' class='img-meme' onclick='setImg(${img.id})' />`;
    })
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}