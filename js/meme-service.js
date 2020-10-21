'use strict';
var gCanvas;
var gCtx;

var gImgs = [
    { id: 1, url: 'img/1.jpg' },
    { id: 2, url: 'img/2.jpg' },
    { id: 3, url: 'img/3.jpg' },
    { id: 4, url: 'img/4.jpg' },
    { id: 5, url: 'img/5.jpg' },
    { id: 6, url: 'img/6.jpg' },
    { id: 7, url: 'img/7.jpg' },
    { id: 8, url: 'img/8.jpg' },
    { id: 9, url: 'img/9.jpg' },
    { id: 10, url: 'img/10.jpg' },
    { id: 11, url: 'img/11.jpg' },
    { id: 12, url: 'img/12.jpg' },
    { id: 13, url: 'img/13.jpg' },
    { id: 14, url: 'img/14.jpg' },
    { id: 15, url: 'img/15.jpg' }

];

var gMeme =
{
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write your text',
            size: 50,
            align: 'left',
            strokColor: 'black',
            fillColor: 'white',
            font: 'Impact'
        },
        {
            txt: 'Write your text',
            size: 50,
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

// function getText(value) {
//     gMeme.lines[0].txt = value;
// }

function setImg(imgID) {
    gMeme.selectedImgId = imgID;
    drawImg();
}

function increaseFontSize(){
gMeme.lines[0].size += 10;
document.querySelector('.font-size').innerText = gMeme.lines[0].size;
}

function decreaseFontSize(){
    gMeme.lines[0].size -= 10;
    document.querySelector('.font-size').innerText = gMeme.lines[0].size;
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

function drawText(text, x = 70, y = 100) {
    gMeme.lines[0].txt = text;

    var text = gMeme.lines[0].txt;
    var size = gMeme.lines[0].size;
    var font = gMeme.lines[0].font;

    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.lineWidth = '2'
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = 'start'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


