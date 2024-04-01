/**
 * 卡片基类，定义了卡片的基本能力
 */
export class Card {
    title = "";

    /**
     * 可以是string，也可以是element
     */
    content = null;

    description = "";

    onKeydown(event) { }

    onKeyup(event) { }

    getTitle() {
        return this.title;
    }

    getContent() {
        return this.content;
    }

    getDesc() {
        return this.description;
    }

}