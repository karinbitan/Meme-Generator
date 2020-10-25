'use strict';

function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    window.onresize = () => {
        drawMeme();
    };
}
// not in use right now
function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth; // show width & height in CSS
    gCanvas.height = elContainer.offsetHeight;
}


function renderGallery() {
    var imgs = gImgs;
    var strHTML = imgs.map(img => `<img src='${img.url}' class='img-meme' onclick='onSetImg(${img.id})' />`)
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function changeLine() {
    const meme = getMeme();
    meme.selectedLineIdx++;
    if (meme.selectedLineIdx > meme.lines.length - 1) meme.selectedLineIdx = 0;
    document.querySelector('.text-meme').value = meme.lines[meme.selectedLineIdx].txt;
    drawMeme();
}

function onDrawText(input) {
    var text = input.value;
    addText(text);
    drawMeme();
}

function onSetImg(imgID) {
    setMeme({ selectedImgId: imgID });
    openMemesEditor();
    document.querySelector('.text-meme').value = '';
    drawMeme();
}

// function focusText(selectedLineIdx = 0, line) {
//     if (!gFocusText) {
        
//         gFocusText = document.createElement('div');
//         gFocusText.classList.add('focus-text');
//         document.querySelector('.canvas-container').appendChild(gFocusText);
//     }
//     var x = gMeme.lines[selectedLineIdx].x;
//     var y = gMeme.lines[selectedLineIdx].y;
    
//     gFocusText.style.width = document.querySelector('.canvas-container').offsetWidth - 20 + "px";

//     let defaultHeight = 25;
//     let fontSize = gMeme.lines[selectedLineIdx].size;

//     const centerLineOffset = selectedLineIdx > 1 ? 20 : 0;

//     let canvasHeight = document.querySelector('.canvas-container').offsetHeight;
//     gFocusText.style.height = defaultHeight + fontSize + 'px';
//     gFocusText.style.bottom = Math.abs(canvasHeight - y + centerLineOffset) + "px";
//     gFocusText.style.left = x - 5 + "px";
// }

function editMeme(savedMemeIndex) {
    let memes = getSavedMemes();
    let memeModel = memes[savedMemeIndex];
    memeModel.savedMemeIndex = savedMemeIndex;
    setMeme(memeModel);
    openMemesEditor();
    document.querySelector('.text-meme').value = memes[savedMemeIndex].lines[0].txt;
    drawMeme();
}

function onAddLine() {
    if (gMeme.lines.length == 5) {
        return;
    }
    let newLine = { ...getDefaultLine() };

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

function onChangeFontSize(value) {
    changeFontSize(value);
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
    // document.querySelector('.keyword-container').style.display = 'block';
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.memes-tab-container').style.display = 'none';
}

function openMemesEditor() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    // document.querySelector('.keyword-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    document.querySelector('.memes-tab-container').style.display = 'none';
}

function openSavesMemes() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    // document.querySelector('.keyword-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.memes-tab-container').style.display = 'block';

    let memes = getSavedMemes();

    let memesTab = document.querySelector('.memes-tab');
   
    memesTab.innerHTML = '';

    for (let i = 0; i < memes.length; i++) {
        let canvasElm = document.createElement('canvas');
        canvasElm.setAttribute('id', `meme-saved-canvas-${i}`)
        canvasElm.setAttribute("width", 540);
        canvasElm.setAttribute("height", 550);
        canvasElm.setAttribute('onclick', `editMeme(${i})`)

        memesTab.appendChild(canvasElm);

        let canvas = canvasElm.getContext('2d');
        drawMeme(memes[i], canvasElm, canvas);
        document.querySelector('.memes-tab-container-msg').style.display = 'none';
    }
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
    }, 300);
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.querySelector('.modal')) {
        document.querySelector('.modal').style.display = "none";
    }
}

//Share options
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

function myFunction() {
    var x = document.querySelector(".main-header");
    if (x.className === "main-header") {
        x.className += " responsive";
    } else {
        x.className = "main-header";
    }
}