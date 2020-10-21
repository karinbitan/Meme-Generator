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
    strHTML = `<input type='text' onkeypress='drawText(this.value)' />
    <br />
    <button onclick='increaseFontSize()'>+</button>
    <span class='font-size'>${gMeme.lines[0].size}</span>
    <button onclick='decreaseFontSize()'>-</button>
    <br />
    <button onclick='moveUp'>Up</button><button onclick='moveDown'>Down</button>
    `
    document.querySelector('.editor').innerHTML = strHTML;
}

function renderGallery(){
    var imgs = gImgs;
    var strHTML = imgs.map(function(img){
        return `'<img src='${img.url}' class='img-meme' onclick='setImg(${img.id})' />`;
    })
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}