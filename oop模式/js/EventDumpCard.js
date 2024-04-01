import { Card } from "./Card.js";

export class EventDumpCard extends Card {
    title = 'Event Dump';

    constructor() {
        super();
        this.frame = this.generateContent();
    }

    onKeydown(event) {
        this.updateContent(event);
    }

    updateContent(event, arr = []) {
        const fragment = document.createDocumentFragment();
        const div = this.generateContent();
        const pre = div.querySelector('pre');
        let which = event.key ? event.key.charCodeAt() : '';
        let keys = event.key ? [event.key, which, event.code, event.location, event.altKey, event.ctrlKey, event.metaKey, event.shiftKey] : [...arr];

        pre.textContent = `
        {
         "key"：${keys[0]},
         "keyCode"：${keys[1]},
         "which"：${keys[1]},
         "code"：${keys[2]},
         "location"：${keys[3]},
         "altKey"：${keys[4]},
         "ctrlKey"：${keys[5]},
         "metaKey"：${keys[6]},
         "shiftKey"：${keys[7]},
         "repeat"：false
        }
      `;
        fragment.appendChild(div);
        this.content = fragment;
        return fragment;
    }

    generateContent() {
        const div = document.createElement('div');
        div.classList.add('dump');
        const pre = document.createElement('pre');
        div.appendChild(pre);
        return div;
    }

}