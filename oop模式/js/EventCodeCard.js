import { Card } from "./Card.js";

export class EventCodeCard extends Card {
    title = "event.code";

    description = "The physical key on the keyboard.Doesn't care if you are holding a modifier like shifts."

    onKeydown(event) {
        this.updateContent(event);
    }

    updateContent(event) {
        this.content = event.code;
    }
}