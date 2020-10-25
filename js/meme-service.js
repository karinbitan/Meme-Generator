'use strict';
var gCanvas;
var gCtx;
var gFocusText;

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

const firstLinePosition = 100;
const secondLinePosition = 500;
const centerLinePosition = 250;

function getDefaultLine() {
    return {
        txt: '',
        size: 50,
        align: 'start',
        strokeStyle: 'black',
        fillStyle: 'white',
        font: 'Impact',
        x: 10,
        y: 100
    };
}

function getDefaultMeme() {
    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        savedMemeIndex: -1,
        lines: [{
            txt: '',
            size: 50,
            align: 'start',
            strokeStyle: 'black',
            fillStyle: 'white',
            font: 'Impact',
            x: 10,
            y: firstLinePosition
        }, ]
    };
}

var gMeme = getDefaultMeme();


function getImgById(imgId) {
    var img = gImgs.find(function(img) {
        return imgId === img.id;
    })
    return img;
}

function setMeme(memeModel = {}) {
    let meme = {
        ...getDefaultMeme(),
        ...memeModel
    };

    meme.selectedLineIdx = 0;
    gMeme = meme;
}

function addText(text) {
    if (!getCurrLine()) getCurrLine() = { ...getDefaultLine() }
    getCurrLine().txt = text
}

function drawMeme(memeModel, canvasSelector, canvasContext) {
    let meme;
    let ctx;
    let selector
    if (memeModel && canvasContext) {
        meme = memeModel;
        ctx = canvasContext;
        selector = canvasSelector;
    } else {
        meme = gMeme;
        ctx = gCtx;
        selector = gCanvas;
    }

    var imgId = meme.selectedImgId;
    var selectedImg = getImgById(imgId);
    var img = new Image()
    img.src = selectedImg.url;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, selector.width, selector.height)
        for (let i = 0; i < meme.lines.length; i++) {
            // var currLine = meme.lines[i];
            ctx.strokeStyle = meme.lines[i].strokeStyle;
            ctx.fillStyle = meme.lines[i].fillStyle;
            ctx.lineWidth = '2'
            ctx.font = `${meme.lines[i].size}px ${meme.lines[i].font}`;
            ctx.textAlign = meme.lines[i].align;
            var posX = meme.lines[i].x;
            var posY = meme.lines[i].y;
            var text = meme.lines[i].txt;
            ctx.fillText(text, posX, posY)
            ctx.strokeText(text, posX, posY)
        }
        // ES6
        // meme.lines.forEach(line => {
        //     ctx.strokeStyle = line.strokeStyle;
        //     ctx.fillStyle = line.fillStyle;
        //     ctx.lineWidth = '2'
        //     ctx.font = `${line.size}px ${line.font}`;
        //     ctx.textAlign = line.align;
        //     const { txt , x , y } = line;
        //     ctx.fillText(txt, x, y)
        //     ctx.strokeText(txt, x, y)
        // })
    }
}

function increaseFontSize() {
    getCurrLine().size += 10;
}

// function changeFont(diff) {
//     getCurrLine().size += diff;
// }

function decreaseFontSize() {
    getCurrLine().size -= 10;
}

function changeAlign(align) {
    // switch (align) {
    //     case 'left':
    //         // getCurrLine().align = 'left';
    //         getCurrLine().x = 10;
    //         break;
    //     case 'center':
    //         // getCurrLine().align = 'center';
    //         getCurrLine().x = 250;
    //         break;
    //     case 'right':
    //         getCurrLine().x = 530;
    //         break;
    // }
    if (align === 'left') getCurrLine().x = 10;
    if (align === 'center') getCurrLine().x = 250;
    if (align === 'right') getCurrLine().x = 530;
    getCurrLine().align = align;
    drawMeme();
}

function changeFont(value) {
    getCurrLine().font = value;
}

function deleteLine() {
    gMeme.lines = gMeme.lines.filter((line, index) => {
        return gMeme.selectedLineIdx != index;
    });
    gMeme.selectedLineIdx = !gMeme.lines.length ? 0 : gMeme.lines.length - 1;
    document.querySelector('.text-meme').value = !gMeme.lines.length ? '' : getCurrLine().txt;
    focusText(gMeme.selectedLineIdx);
}

function changeFontColor(color) {
    getCurrLine().fillStyle = color;
}

function changeStrokeColor(color) {
    getCurrLine().strokeStyle = color;
}

function getMeme() {
    return gMeme;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}