import {Card} from './Card.js';

export class EventLocationCard extends Card {
    title = "event.location";

    description = "Some keys exist more than once on your keyboard.This provides the location of the pressed.Try it with both shifts."

    onKeydown(event) {
        this.updateContent(event);
    }

    updateContent(event) {
        const locationType = ['Genneral Keys', 'Left-side modifier keys', 'Right-side modifier keys', 'Numpad'];
        this.content = locationType[event.location];
    }
}