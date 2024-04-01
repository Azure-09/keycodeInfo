import { Card } from "./Card.js";

export class MetaKeysCard extends Card {
    title = 'Meta.Keys';

    onKeydown(event) {
        this.updateContent(event, []);
    }

    onKeyup(elements) {
        this.removeStatus(elements);
    }

    updateContent(event, arr) {
        this.content = this.changeStatus(event, arr);
    }

    changeStatus(event, arr = []) {
        const divBox = this.generateContent();
        const elements = divBox.children;
        const fragment = document.createDocumentFragment();

        const [metaKey, shiftKey, altKey, ctrlKey] = arr;
        ;
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('changeStatus');
        }
        let indexToChange = -1;
        if (event.metaKey || metaKey) {
            indexToChange = 0;
        } else if (event.shiftKey || shiftKey) {
            indexToChange = 1;
        } else if (event.altKey || altKey) {
            indexToChange = 2;
        } else if (event.ctrlKey || ctrlKey) {
            indexToChange = 3;
        }
        if (indexToChange != -1 && indexToChange < elements.length) {
            elements[indexToChange].classList.add('changeStatus');
        }
        fragment.appendChild(divBox);
        return fragment;
    }

    generateContent() {
        const metakeys = ['⌘', '⇧', '⌥', '^'];
        const divBox = document.createElement('div');
        divBox.classList.add('fnkeyAll');
        for (let i = 0; i < metakeys.length; i++) {
            const div = document.createElement('div');
            div.classList.add('fnkey');
            const span = document.createElement('span');
            span.textContent = metakeys[i];
            div.appendChild(span);
            divBox.appendChild(div);
        }
        return divBox;
    }

    removeStatus(elements) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('changeStatus');
        }
    }
}