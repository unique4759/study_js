'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.createEl = function() {
    let firstSymbol = this.selector[0],
        bodyElement;

    if(firstSymbol === '.') {
        let div = document.createElement('div');

        div.textContent = 'Класс ' + this.selector.slice(1);
        div.classList.add(this.selector.slice(1))
        document.body.appendChild(div);
        bodyElement = div;
    }

    if(firstSymbol === '#') {
        let paragraph = document.createElement('p');

        paragraph.textContent = 'Айдишник ' + this.selector.slice(1);
        paragraph.setAttribute('id', this.selector.slice(1));
        document.body.appendChild(paragraph);
        bodyElement = paragraph;
    }

    bodyElement.style.height = this.height + 'px';
    bodyElement.style.width = this.width + 'px';
    bodyElement.style.background = this.bg;
    bodyElement.style.fontSize = this.fontSize + 'px';
};

let example = new DomElement('#block', 200, 300, '#CCCCCC', 30);
let exampleTwo = new DomElement('.black', 500, 500, '#f5f5f5', 20);

exampleTwo.createEl();
