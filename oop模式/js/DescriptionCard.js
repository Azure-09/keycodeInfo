import { Card } from "./Card.js";
import { descriptionMap } from "../configs/descriptionMap.js";

export class DescriptionCard extends Card {
    title = "Description";

    constructor() {
        super();
        this.history = [];
        this.description = this.generateDesc();
    }

    onKeydown(event) {
        this.updateContent(event);
        this.updateDescription();
        this.getdescriptionInfo();
    }

    updateContent(event) {
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
        this.content = content;
        this.history.unshift(this.content);
    }

    updateDescription() {
        this.description = this.generateDesc();
    }

    getdescriptionInfo() {
        return this.history.slice(0, 4);
    }

    generateDesc() {
        const fragment = document.createDocumentFragment();
        const configs = [
            {
                elementType: "",
                textContent: "This is the description we have created. Think it can be improved? ",
                attrs: []
            },
            {
                elementType: "a",
                textContent: "PR us on GitHub",
                attrs: [
                    { name: "href", value: "https://github.com/toptal/keycodes" },
                    { name: "target", value: "_blank" }
                ]
            }
        ];
        configs.forEach((config) => {
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