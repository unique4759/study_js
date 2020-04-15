'use strict';

document.addEventListener("DOMContentLoaded", () => {
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
    
            div.textContent = this.fontSize ? 'Класс ' + this.selector.slice(1) : '';
            div.classList.add(this.selector.slice(1));
            document.body.appendChild(div);
            bodyElement = div;
        }
    
        if(firstSymbol === '#') {
            let paragraph = document.createElement('p');
    
            paragraph.textContent = this.fontSize ? 'Айдишник ' + this.selector.slice(1) : 0;
            paragraph.setAttribute('id', this.selector.slice(1));
            document.body.appendChild(paragraph);
            bodyElement = paragraph;
        }
    
        bodyElement.style.height = this.height + 'px';
        bodyElement.style.width = this.width + 'px';
        bodyElement.style.background = this.bg;
        bodyElement.style.fontSize = this.fontSize + 'px';

        bodyElement.style.position = this.fontSize ? 'relative' : 'absolute';

        return this.selector;
    };
    
    let example = new DomElement('#block', 200, 300, 'transparent', 30);
    let exampleTwo = new DomElement('.black', 500, 500, 'transparent', 20);

    let forSquare = new DomElement('.square', 100, 100, '#000', '');
    
    let elem = forSquare.createEl();

    document.body.addEventListener('keydown', (e) => {
        let checkEl = document.querySelectorAll(elem)[0],
            positionEl;

        if (e.keyCode === 37) {
            positionEl = checkEl.style.left === '' ? 0 : checkEl.style.left.slice(0, -2);
            checkEl.style.left = (+positionEl - 10) + 'px';
        }
        if (e.keyCode === 38) {
            positionEl = checkEl.style.top === '' ? 0 : checkEl.style.top.slice(0, -2);
            checkEl.style.top = (+positionEl - 10) + 'px';
        }
        if (e.keyCode === 39) {
            positionEl = checkEl.style.left === '' ? 0 : checkEl.style.left.slice(0, -2);
            checkEl.style.left = (+positionEl + 10) + 'px';
        }
        if (e.keyCode === 40) {
            positionEl = checkEl.style.top === '' ? 0 : checkEl.style.top.slice(0, -2);
            checkEl.style.top = (+positionEl + 10) + 'px';
        }
    });
});
