'use strict';

var key = 'canvas';

function saveToLocalStorage() {
    localStorage.setItem(key, gCanvas.toDataURL());
}