'use strict';

function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

    renderEditor();
    renderGallery();
}

function renderEditor() {
    var strHTML = '';
    strHTML = `<input type='text' onkeyup='onDrawText(this.value)' class='text-meme' placeholder='Type your text..' /> <br />
    <button class='editor-btn' onclick='changeLine()'><img src='design/ICONS/up-and-down-opposite-double-arrows-side-by-side.png' /></button>
    <button class='editor-btn' onclick='onAddLine()'><img src='design/ICONS/add.png' /></button>
    <button class='editor-btn' onclick='onDeleteLine()'><img src='design/ICONS/trash.png' /></button> <br />
    <button class='editor-btn' onclick='onIncreaseFontSize()'><img src='design/ICONS/increase-font-icon.png'></button>
    <button class='editor-btn' onclick='onDecreaseFontSize()'><img src='design/ICONS/decrease-font-icon.png'></button>
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

    <label for='stroke-color'>
    <div class='editor-btn'><img src='design/ICONS/text-stroke.png'/></div>
    <input type='color' id='stroke-color' style='display:none' onclick='onChangeStrokeColor(this.value)' />
    </label>
    <label for='font-color'>
    <div class='editor-btn'><img src='design/ICONS/paint-board-and-brush.png'/></div> 
    <input type='color' id='font-color' style='display:none' onclick='onChangeFontColor(this.value)' />
    </label>
    
    <button class='save-btn'>Save</button>
     <button class='save-btn'>Share</button>
    <a href='#' class='save-btn' onclick='onDownloadMeme(this)' download=''>Download</a>
    `;

    document.querySelector('.editor').innerHTML = strHTML;
}

function renderGallery() {
    var imgs = gImgs;
    var strHTML = imgs.map(function (img) {
        return `<img src='${img.url}' class='img-meme' onclick='onSetImg(${img.id})' />`;
    })
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function changeLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
    document.querySelector('.text-meme').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function onDrawText(text) {
    addText(text);
    drawMeme();
}

function onSetImg(imgID) {
    document.querySelector('.text-meme').value = '';
    setImg(imgID);
    openMemesEditor();
    drawMeme();
}

function onAddLine() {
    if (gMeme.lines.length == 5) {
        return;
    }

    let newLine = { ...default_text_line };

    var posY;
    if (gMeme.lines.length == 0) {
        posY = firstLinePosition;
    }
    else if (gMeme.lines.length == 1) {
        posY = secondLinePosition;
    }
    else if (gMeme.lines.length == 2) {
        posY = centerLinePosition;
    }
    else {
        posY = gMeme.lines[gMeme.lines.length - 1].y + 70;
    }

    newLine.y = posY;
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    drawMeme()

    document.querySelector('.text-meme').value = newLine.txt;
}

function onDeleteLine() {
    deleteLine();

    drawMeme();
}

function onIncreaseFontSize() {
    increaseFontSize();
    drawMeme();
}

function onDecreaseFontSize() {
    decreaseFontSize();
    drawMeme();
}

function onChangeFont(value) {
    changeFont(value);
}

function onDownloadMeme(elLink) {
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


function onChangeFontColor(color) {
    changeFontColor(color);
    drawMeme();
}

