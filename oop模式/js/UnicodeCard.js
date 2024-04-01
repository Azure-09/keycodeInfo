import { Card } from "./Card.js";
import { unicodeMap } from "../configs/unicodeMap.js";

export class UnicodeCard extends Card {
    title = 'Unicode';

    onKeydown(event) {
        this.updateContent(event);
    }

    updateContent(event, arr = []) {
        let [keycode, unicode] = arr;
        let eventKey = event.key ? event.key.charCodeAt() : ''
        let key = eventKey || keycode;
        let content = '';
        if (key >= 48 && key <= 57) {
            content = event.key || unicode;
        } else {
            content = ((event.key in unicodeMap) || (unicode in unicodeMap)) ? (unicodeMap[event.key] || unicodeMap[unicode]) : '';
        }
        this.content = content;
        return this.content;
    }
}