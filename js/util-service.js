'use strict';

function getSavedMemes() {
    let memes = localStorage.getItem('savedMemes');
    if (memes) {
        memes = JSON.parse(memes);
    }
    else {
        memes = [];
    }

    return memes;
}

function saveToLocalStorage() {
    let memes = getSavedMemes();
    if (gMeme.savedMemeIndex === -1) {
        memes.push(gMeme);
    } else {
        memes[gMeme.savedMemeIndex] = gMeme;
    }

    localStorage.setItem('savedMemes', JSON.stringify(memes));
}

// function saveToLocalStorage() {
//     localStorage.setItem('savedMemes', JSON.stringify(gMeme));
// }

