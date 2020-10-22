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
    { id: 15, url: 'img/15.jpg' },
    { id: 16, url: 'img/16.jpg' },
    { id: 17, url: 'img/17.jpg' },
    { id: 18, url: 'img/18.jpg' }

];

const default_text_line = {
    txt: 'Please edit me',
    size: 50,
    align: 'start',
    strokColor: 'black',
    fillColor: 'white',
    font: 'Impact',
    x: 10,
    y: 100
};

const firstLinePosition = 100;
const secondLinePosition = 500;
const centerLinePosition = 250;

var gMeme =
{
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 50,
            align: 'start',
            strokColor: 'black',
            fillColor: 'white',
            font: 'Impact',
            x: 10,
            y: firstLinePosition
        },
    ]
}



function getImgById(imgId) {
    var img = gImgs.find(function (img) {
        return imgId === img.id;
    })
    return img;
}

function setImg(imgID) {

    for (let i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].strokColor = 'black';
        gMeme.lines[i].fillColor = 'white';
        gMeme.lines[i].txt = '';
        gMeme.lines[i].size = 50;
        gMeme.lines[i].align = 'start';
    }
    gMeme.selectedImgId = imgID;
}

function addText(text) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx] = { ...default_text_line }
    }

    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function drawMeme() {
    var imgId = gMeme.selectedImgId;
    var selectedImg = getImgById(imgId);
    var img = new Image()
    img.src = selectedImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        for (let i = 0; i < gMeme.lines.length; i++) {
            gCtx.strokeStyle = gMeme.lines[i].strokColor;
            gCtx.fillStyle = gMeme.lines[i].fillColor;
            gCtx.lineWidth = '2'
            gCtx.font = `${gMeme.lines[i].size}px ${gMeme.lines[i].font}`;
            gCtx.textAlign = gMeme.lines[i].align;


            var posX = gMeme.lines[i].x;
            var posY = gMeme.lines[i].y;
            var text = gMeme.lines[i].txt;

            gCtx.fillText(text, posX, posY)
            gCtx.strokeText(text, posX, posY)
        }
    }
}

// function drawText(text){
//     gMeme.lines[0].txt = text;
//     gCtx.strokeStyle = gMeme.lines[0].strokColor;
//     gCtx.fillStyle = gMeme.lines[0].fillColor;
//     gCtx.lineWidth = '2'
//     gCtx.font = `${gMeme.lines[0].size}px ${gMeme.lines[0].font}`;
//     gCtx.textAlign = gMeme.lines[0].align;

//     gCtx.fillText(text, x, y)
//     gCtx.strokeText(text, x, y)
// }



function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 10;
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 10;
}

function changeAlign(align) {
    switch (align) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].align = 'left';
            gMeme.lines[gMeme.selectedLineIdx].x = 10;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].align = 'center';
            gMeme.lines[gMeme.selectedLineIdx].x = 250;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].align = 'right';
            gMeme.lines[gMeme.selectedLineIdx].x = 530;
            break;
    }
    drawMeme();
}

function changeFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value;
}

function deleteLine() {
    gMeme.lines = gMeme.lines.filter((line, index) => {
        return gMeme.selectedLineIdx != index;
    });

    // var newLines = []
    // for (let i = 0 ; i < gMeme.lines.length ; i++) {
    //     if (gMeme.selectedLineIdx != i) {
    //         newLines[gMeme.lines[i]]
    //     }
    // }
    // gMeme.lines = newLines;

    gMeme.selectedLineIdx = !gMeme.lines.length ? 0 : gMeme.lines.length - 1;
    document.querySelector('.text-meme').value = !gMeme.lines.length ? '' : gMeme.lines[gMeme.selectedLineIdx].txt;
}

function changeFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}