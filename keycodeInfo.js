/**
 * 卡片基类，定义了卡片的基本能力
 */
class Card {
  title = "";

  /**
   * 可以是string，也可以是element
   */
  content = null;

  description = "";

  onKeydown(event) {}

  onKeyup(event) {}

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

class EventKeyCard extends Card {
  title = "event.key";

  description = "The value of the key pressed. Accounts for modifiers keys that return CAPS and alternate chars.";

  onKeydown(event) {
    this.updateContent(event);
  }

  updateContent(event) {
    this.content = event.key;
  }
}

class EventWhichCard extends Card {
  title = "event.which";

  constructor(config) {
    super(config);
    this.description = this.generateDesc();
  }

  onKeydown(event) {
    this.updateContent(event);
  }

  updateContent(event) {
    this.content = event.key;
  }

  generateDesc() {
    const fragment = document.createDocumentFragment();
    const configs = [
      {
        elementType: "",
        textContent: "event.which and event.keyCode are",
        attrs: [],
      },
      {
        elementType: "a",
        textContent: "deprecated",
        attrs: [
          { name: "href", value: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" },
          { name: "target", value: "_blank" },
        ],
      },
      {
        elementType: "",
        textContent: "in modern browsers. Use ",
        attrs: [],
      },
      {
        elementType: "code",
        textContent: ".key",
        attrs: [],
      },
      {
        elementType: "code",
        textContent: ".code",
        attrs: [],
      },
      {
        elementType: "",
        textContent: " instead.",
        attrs: [],
      },
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

const cards = [new EventKeyCard(), new EventWhichCard()];

window.addEventListener("keydown", event => {
  const cardInfo = cards.map(card => {
    card.onKeydown(event);
    return {
      title: card.title,
      content: card.content,
      description: card.description,
    }
  })
  console.log(cardInfo);
})
