import { Card } from "./Card.js";
import { whichMap } from "../configs/whichMap.js";

export class EventWhichCard extends Card {
    title = "event.which";
    constructor(){
        super();
        this.description = this.generateDesc();
    }

    onKeydown(event) {
        this.updateContent(event);
        this.updateDescription();
    }

    updateContent(event) {
        this.content = event.key.charCodeAt();
    }

    updateDescription() {
        this.description = this.generateDesc();
    }

    generateDesc() {
        const fragment = document.createDocumentFragment();
        whichMap.forEach((config) => {
            const { elementType, textContent, attrs } = config;
            if (!elementType) {
                fragment.appendChild(document.createTextNode(textContent));
                return;
            }
            const elm = document.createElement(elementType);
            elm.textContent = textContent;
            attrs.forEach((attr) => {
                const { name, value } = attr;
                elm.setAttribute(name, value);
            });
            fragment.appendChild(elm);
        });
        return fragment;
    }
}