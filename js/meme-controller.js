'use strict';

function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas2 = document.querySelector('#meme-canvas2');
    gCtx2 = gCanvas2.getContext('2d');

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
    <input type='color' id='stroke-color' style='display:none' onChange='onChangeStrokeColor(this.value)' />
    </label>
    <label for='font-color'>
    <div class='editor-btn'><img src='design/ICONS/paint-board-and-brush.png'/></div> 
    <input type='color' id='font-color' style='display:none' onChange='onChangeFontColor(this.value)' />
    </label>
    
    <form action='' method='POST' enctype='multipart/form-data' onsubmit='uploadImg(this, event)'>
    <input name='img' id='imgData' type='hidden' />
    <button onclick='openModal()' class='share-btn' type='submit'>Share</button>
</form>
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
    drawMeme();
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
    document.querySelector('.memes-tab').style.display = 'none';
}

function openMemesEditor() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    document.querySelector('.keyword-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    document.querySelector('.memes-tab').style.display = 'none';
}

function openSavesMemes() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    document.querySelector('.keyword-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.memes-tab').style.display = 'block';

    var dataURL = localStorage.getItem(key);
    var img = new Image;
    img.src = dataURL;
    img.onload = function () {
        gCtx2.drawImage(img, 0, 0, gCanvas2.width, gCanvas2.height);
    };
}

function onChangeFontColor(color) {
    changeFontColor(color);
    drawMeme();
}

function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    drawMeme();
}

function openModal() {
    setTimeout(() => {
        document.querySelector('.modal').style.display = 'block';
    }, 1000);
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.querySelector('.modal')) {
        document.querySelector('.modal').style.display = "none";
    }
}


// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>
        <a href='#' class='share-btn' onclick='onDownloadMeme(this)' download=''>Download</a>
        <button class='share-btn' onclick='saveToLocalStorage()'>Save</button>
        `
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

