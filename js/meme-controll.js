'use strict';

function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
    renderEditor();
    renderGallery();
}
    // <span class='font-size'>${gMeme.lines[0].size}</span>
function renderEditor(){
    var strHTML = '';
    strHTML = `<input type='text' onkeypress='drawText1(this.value)' class='text-meme' placeholder='text line1' /> <br />
    <input type='text' onkeypress='drawText2(this.value)' class='text-meme' placeholder='text line2' /> <br />
    <button class='editor-btn'><img src='design/ICONS/up-and-down-opposite-double-arrows-side-by-side.png' /></button>
    <button class='editor-btn'><img src='design/ICONS/add.png' /></button>
    <button class='editor-btn'><img src='design/ICONS/trash.png' /></button> <br />
    <button class='editor-btn' onclick='increaseFontSize()'><img src='design/ICONS/increase-font-icon.png'></button>
    <button class='editor-btn' onclick='decreaseFontSize()'><img src='design/ICONS/decrease-font-icon.png'></button>
    <button class='editor-btn' onclick='changeAlign("left")'><img src='design/ICONS/align-to-left.png' /></button>
    <button class='editor-btn' onclick='changeAlign("center")'><img src='design/ICONS/center-text-alignment.png' /></button>
    <button class='editor-btn' onclick='changeAlign("right")'><img src='design/ICONS/align-to-right.png'/></button>
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