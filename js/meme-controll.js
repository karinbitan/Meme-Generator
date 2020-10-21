'use strict';

function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
    renderEditor();
    renderGallery();
}
// <span class='font-size'>${gMeme.lines[0].size}</span>
function renderEditor() {
    var strHTML = '';
    strHTML = `<input type='text' onkeypress='drawText1(this.value)' class='text-meme' placeholder='text line1' /> <br />
    <button class='editor-btn'><img src='design/ICONS/up-and-down-opposite-double-arrows-side-by-side.png' /></button>
    <button class='editor-btn' onclick='onAddLine()'><img src='design/ICONS/add.png' /></button>
    <button class='editor-btn'><img src='design/ICONS/trash.png' /></button> <br />
    <button class='editor-btn' onclick='onIncreaseFontSize()'><img src='design/ICONS/increase-font-icon.png'></button>
    <button class='editor-btn' onclick='onDdecreaseFontSize()'><img src='design/ICONS/decrease-font-icon.png'></button>
    <button class='editor-btn' onclick='changeAlign("left")'><img src='design/ICONS/align-to-left.png' /></button>
    <button class='editor-btn' onclick='changeAlign("center")'><img src='design/ICONS/center-text-alignment.png' /></button>
    <button class='editor-btn' onclick='changeAlign("right")'><img src='design/ICONS/align-to-right.png'/></button> <br />
    <select class='change-font' onchange='onChangeFont(this.value)'>
    <option>Impact</option>
    <option>Arial</option>
    <option>Comic</option>
    <option>Verdana</option>
    <option>Serif</option>
    </select>
    <button class='editor-btn' onclick='onChangeStroke()'><img src='design/ICONS/text-stroke.png'/></button>
    <button class='editor-btn' onclick='changeFontColor()'><img src='design/ICONS/paint-board-and-brush.png'/></button> 
    <br />
    <button class='save-btn'>Save</button>
     <button class='save-btn'>Share</button>
    <a href='#' class='save-btn' onclick='onDownloadMeme(this)' download=''>Download</a>
    `
    document.querySelector('.editor').innerHTML = strHTML;
}

function renderGallery() {
    var imgs = gImgs;
    var strHTML = imgs.map(function (img) {
        return `<img src='${img.url}' class='img-meme' onclick='onSetImg(${img.id})' />`;
    })
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function onSetImg(imgID) {
    setImg(imgID);
    openMemesEditor();
    drawImg();
}

function onAddLine() {
    document.querySelector('.text-meme').value = '';
    drawText2();
}


function onIncreaseFontSize() {
    document.querySelector('.font-size').innerText = gMeme.lines[0].size;
}

function onDecreaseFontSize() {
    document.querySelector('.font-size').innerText = gMeme.lines[0].size;
}

function onChangeFont(value) {
    changeFont(value);
}

function onDownloadMeme(elLink){
        const data = gCanvas.toDataURL()
        console.log(data);
        elLink.href = data;
        elLink.download = 'meme1.jpg'
}

function openGallery() {
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.profile-section').style.display = 'flex';
    document.querySelector('.keyword-container').style.display = 'block';
    document.querySelector('.editor-container').style.display = 'none';
}

function openMemesEditor() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    document.querySelector('.keyword-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
}
