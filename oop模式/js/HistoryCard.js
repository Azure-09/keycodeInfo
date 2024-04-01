import { Card } from "./Card.js";
import { descriptionMap } from "../configs/descriptionMap.js";

export class HistoryCard extends Card {
    title = 'History';

    constructor() {
        super();
        this.history = [];
    }

    onKeydown(event) {
        this.updateContent(event);
        this.getKeyInfo(event);
    }

    updateContent(event) {
        const fragment = document.createDocumentFragment();
        const divBox = this.generateContent();
        const historyMap = this.getHistoryMap(event);
        const button = document.createElement('button');
        button.classList.add('hcode');
        button.textContent = historyMap[0];
        divBox.prepend(button);
        if (divBox.children.length > 4) {
            let lastDiv = divBox.lastElementChild;
            divBox.removeChild(lastDiv);
        }
        fragment.appendChild(divBox);
        this.content = fragment;
    }

    generateContent() {
        let divBox = document.querySelector('.historyCode');
        if (!divBox) {
            divBox = document.createElement('div');
            divBox.classList.add('historyCode');
        }
        return divBox;
    }


    getHistoryMap(event) {
        const content = [];
        content.unshift(event.key);
        if (content.length > 4) {
            content.pop();
        }
        return content;
    }

    getKeyInfo(event) {
        const description = this.getDesciption(event);
        
        if (this.history.length > 4) {
            this.history.pop();
        }
        this.history.unshift({
            key: event.key,
            location: event.location,
            code: event.code,
            keycode: event.key.charCodeAt(),
            description: description,
            metaKey: event.metaKey,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey
        });
    }

    getHistory() {
        return this.history;
    }

    getDesciption(event) {
        const keyCode = event.key.charCodeAt();
        let content = ''
        descriptionMap.forEach(item => {
            const { location, data } = item;
            if (event.location === location) {
                if (location === 0) {
                    if (keyCode >= 97 && keyCode <= 122) {
                        content = event.key;
                    } else if (keyCode >= 48 && keyCode <= 57) {
                        content = (keyCode == 48) ? event.key : event.key + ' Key';
                    } else {
                        content = (event.key in data) ? data[event.key] : 'No Description.';
                    }
                } else if (location === 1) {
                    content = (event.key in data) ? data[event.key] : 'No Description.';
                } else if (location === 2) {
                    content = (event.key in data) ? data[event.key] : 'No Description.';
                } else if (location === 3) {
                    if (keyCode >= 48 && keyCode <= 57) {
                        content = (keyCode == 48) ? event.key : 'Number Pad ' + event.key;
                    } else {
                        content = (event.key in data) ? data[event.key] : 'No Description.';
                    }
                }
            }
        })
        return content;
    }
}