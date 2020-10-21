'use strict';
var gCanvas;
var gCtx;

var gImgs = [
    { id: 1, url: 'img/1.jpg' },
    { id: 2, url: 'img/2.jpg' }

];

var gMeme =
{
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write your text',
            size: 20,
            align: 'left',
            strokColor: 'black',
            fillColor: 'white',
            font: 'Impact'
        }
    ]
}



function getImgById(imgId) {
    var img = gImgs.find(function (img) {
        return imgId === img.id;
    })
    return img;
}

function getText(value) {
    gMeme.lines[0].txt = value;
}

function setImg(imgID) {
    gMeme.selectedImgId = imgID;
    drawImg();
}

function drawImg() {
    var imgId = gMeme.selectedImgId;
    var selectedImg = getImgById(imgId);
    var img = new Image()
    img.src = selectedImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawText(x = 70, y = 100) {
    var text = gMeme.lines[0].txt;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.lineWidth = '2'
    gCtx.font = '48px Impact'
    gCtx.textAlign = 'start'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


