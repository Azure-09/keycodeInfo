import { Card } from "./Card.js";

export class EventKeyCard extends Card {
    title = "event.key";

    description = "The value of the key pressed. Accounts for modifiers keys that return CAPS and alternate chars.";

    onKeydown(event) {
        this.updateContent(event);
    }

    updateContent(event) {
        this.content = event.key;
    }
}