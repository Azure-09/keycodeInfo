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

  frame = null;

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

  getFrame() {
    return this.frame;
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
    this.content = event.key.charCodeAt();
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

class EventLocation extends Card {
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

class EventCode extends Card {
  title = "event.code";

  description = "The physical key on the keyboard.Doesn't care if you are holding a modifier like shifts."

  onKeydown(event) {
    this.updateContent(event);
  }

  updateContent(event) {
    this.content = event.code;
  }
}

class Description extends Card {
  title = "Description";

  constructor() {
    super();
    this.history = [];
    this.description = this.generateDesc();
  }

  onKeydown(event) {
    this.updateContent(event);
    this.getdescriptionInfo();
  }

  updateContent(event) {
    const descriptionMap = [
      {
        "location": 0,
        data: {
          "[": "open braket",
          "]": "close bracket / å",
          "\/": "back slash",
          ";": "semicolon (firefox), equals",
          "'": "single quote / ø / ä",
          '"': "double quote",
          "Enter": "Enter / Return",
          ",": "comma",
          ".": "period",
          ">": "greater than",
          "/": "forward slash / ç",
          "?": "question mark",
          "(blank space)": "spacebar",
          "ArrowUp": "up arrow",
          "ArrowDown": "down arrow",
          "ArrowLeft": "left arrow",
          "ArrowRight": "right arrow",
          "+": "add",
          "-": "subtract",
          "NumLock": "num lock",
          "Backspace": "backspace / delete",
          "CapsLock": "caps lock",
          "Tab": "tab",
          "`": "Backtick / grave accent / ñ / æ / ö / § / ±",
          "!": "exclamation mark",
          "@": "at sign",
          "#": "hash",
          "%": "percent",
          "&": "and",
          "(": "parentheses left",
          "_": "underscore",
          "F1": "f1",
          "F2": "f2",
          "F3": "f3",
          "F4": "f4",
          "F5": "f5",
          "F6": "f6",
          "F7": "f7",
          "F8": "f8",
          "F9": "f9",
          "F10": "f10",
          "F11": "f11",
          "F12": "f12",
        }
      },
      {
        "location": 1,
        data: {
          "Shift": "shift",
          "Control": "ctrl",
          "Meta": "Windows Key / Left ⌘ / Chromebook Search key",
          "Alt": "Alt / Option",
        }
      },
      {
        "location": 2,
        data: {
          "Control": "ctrl",
          "Alt": "Alt / Option",
        }
      },
      {
        "location": 3,
        data: {
          "+": "add",
          "-": "subtract",
          "*": "multiply",
          "/": "divide",
          ".": "decimal point"
        }
      }
    ]
    const keyCode = event.key.charCodeAt();
    descriptionMap.forEach(item => {
      const { location, data } = item;
      if (event.location === location) {
        if (location === 0) {
          if (keyCode >= 97 && keyCode <= 122) {
            this.content = event.key;
          } else if (keyCode >= 48 && keyCode <= 57) {
            this.content = (keyCode == 48) ? event.key : event.key + ' Key';
          } else {
            this.content = (event.key in data) ? data[event.key] : 'No Description.';
          }
        } else if (location === 1) {
          this.content = (event.key in data) ? data[event.key] : 'No Description.';
        } else if (location === 2) {
          this.content = (event.key in data) ? data[event.key] : 'No Description.';
        } else if (location === 3) {
          if (keyCode >= 48 && keyCode <= 57) {
            this.content = (keyCode == 48) ? event.key : 'Number Pad ' + event.key;
          } else {
            this.content = (event.key in data) ? data[event.key] : 'No Description.';
          }
        }
      }
    })
    this.history.unshift(this.content);
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

class MetaKeys extends Card {
  title = 'Meta.Keys';

  constructor() {
    super();
    this.frame = this.generateContent();
  }

  onKeyup(elements) {
    this.removeStatus(elements);
  }

  generateContent() {
    const metakeys = ['⌘', '⇧', '⌥', '^'];
    const fragment = document.createDocumentFragment();
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
    fragment.appendChild(divBox);
    return fragment;
  }

  changeStatus(event, elements, arr = []) {
    const [metaKey, shiftKey, altKey, ctrlKey] = arr;
    console.log(arr);
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

  }

  removeStatus(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('changeStatus');
    }
  }
}

class EventDump extends Card {
  title = 'Event Dump';

  constructor() {
    super();
    this.frame = this.generateContent();
  }

  onKeydown(event) {
    this.updateContent(event);
  }

  updateContent(event, arr = []) {
    let [key, keycode, code, location, altKey, ctrlKey, metaKey, shiftKey] = arr;

    let which = event.key ? event.key.charCodeAt() : '';
    let keys = [event.key || key, which || keycode, event.code || code, event.location || location, event.altKey || altKey, event.ctrlKey || ctrlKey, event.metaKey || metaKey, event.shiftKey || shiftKey];
    this.content = `
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
    return this.content;
  }

  generateContent() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.classList.add('dump');
    const pre = document.createElement('pre');
    div.appendChild(pre);
    fragment.appendChild(div);
    return fragment;
  }

}

class SimilarValue extends Card {
  title = 'Similar Value';

  content = 'NO';
}

class Unicode extends Card {
  title = 'Unicode';

  onKeydown(event) {
    this.content = this.updateContent(event);
  }

  updateContent(event, arr = []) {
    let [keycode, unicode] = arr;
    const unicodeMap = {
      '/': '÷',
      '*': '×',
      'NumLock': '⇭',
      'ArrowUp': '↑',
      'ArrowDown': '↓',
      'ArrowLeft': '←',
      'ArrowRight': '→',
      'Enter': '↵',
      'Backspace': '⌫',
      '!': '!',
      '@': '@',
      '#': '#',
      '%': '%',
      '&': '&',
      '(': '(',
      '_': '_',
      'Alt': '⎇ / ⌥',
      'Meta': '⌘ ⊞',
      'Control': '^',
      'Shift': '⇧',
      'CapsLock': '⇪',
      'Tab': '↹',
      'Escape': '⎋'
    }
    let eventKey = event.key ? event.key.charCodeAt() : ''
    let key = eventKey || keycode;
    let content = '';
    if (key >= 48 && key <= 57) {
      content = event.key || unicode;
    } else {
      content = ((event.key in unicodeMap) || (unicode in unicodeMap)) ? (unicodeMap[event.key] || unicodeMap[unicode]) : '';
    }
    return content;
  }
}

class History extends Card {
  title = 'History';

  constructor() {
    super();
    this.history = [];
    this.frame = this.generateContent();
  }

  onKeydown(event) {
    this.content = this.updateContent(event);
    this.getKeyInfo(event);
  }

  updateContent(event) {
    const historyMap = this.handleContent(event);
    const button = document.createElement('button');
    button.classList.add('hcode');
    button.textContent = historyMap[0];
    return button;
  }

  generateContent() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.classList.add('historyCode');
    fragment.appendChild(div);
    return fragment;
  }

  // 获取历史信息
  handleContent(event) {
    const content = [];
    content.unshift(event.key);
    if (content.length > 4) {
      content.pop();
    }
    return content;
  }

  getKeyInfo(event) {
    if (this.history.length > 4) {
      this.history.pop();
    }
    this.history.unshift([event.key, event.location, event.code, event.key.charCodeAt(), event.metaKey, event.altKey, event.ctrlKey, event.shiftKey])
  }

  getHistory() {
    return this.history.slice(0, 4);
  }
}

// 创建实例对象
const cards = [new EventKeyCard(), new EventLocation(), new EventCode(), new EventWhichCard(), new Description(), new MetaKeys(), new EventDump(), new SimilarValue(), new Unicode(), new History()];

// 获取元素
const smallTitle = document.querySelector('.smallTitle');
const bigTitle = document.querySelector('.code');
const ul = document.querySelector('.list');

// 遍历获取卡片的标题、框架、描述
const CardFram = cards.map(card => {
  return {
    title: card.getTitle(),
    frame: card.getFrame(),
    description: card.getDesc(),
  }
})
generateCar(CardFram);


/**
 * 注册键盘按下事件
 */
window.addEventListener("keydown", (event) => {
  event.preventDefault();

  // 遍历获取卡片的内容
  const cardInfo = cards.map(card => {
    card.onKeydown(event);
    return {
      content: card.getContent(),
    }
  })

  // 生成卡片结构并渲染内容
  renderCar(cardInfo);

  // 渲染标题
  let keycode = cardInfo[3].content;
  renderTitle(keycode);

  // 渲染Meta Key
  renderMetaKey(event, metaKeys);

  // 渲染历史信息
  renderHistory();

  //注册按键弹起事件
  window.addEventListener('keyup', () => {
    keyup();
  })

})

// 获取渲染后的元素
const metaKeys = document.querySelectorAll('.fnkey');
const historyBox = document.querySelector('.historyCode');
const content = document.querySelectorAll('.list_content');
const pre = document.querySelector('.dump pre');

/**
 * 注册鼠标点击历史记录事件
 */
historyBox.addEventListener('click', function (event) {
  const target = event.target;

  // 合并不同按键的历史记录
  let getHistory = cards[9].getHistory();
  let descriptionInfo = cards[4].getdescriptionInfo();

  // 渲染内容
  if (target.tagName.toLowerCase() === 'button') {
    getHistory.forEach((item, index) => {
      let [key, location, code, keycode, metaKey, altKey, ctrlKey, shiftKey] = item;

      if (item.indexOf(target.textContent) !== -1) {
        // 渲染标题
        renderTitle(keycode);

        // 渲染前五个卡片
        for (let i = 0; i < content.length - 5; i++) {
          content[i].textContent = item[i];
        }
        content[4].textContent = descriptionInfo[index];

        // 渲染Meta Key卡片
        renderMetaKey(event, metaKeys, [metaKey, shiftKey, altKey, ctrlKey]);
        setTimeout(() => {
          keyup();
        }, 100);

        // 渲染Event Dump
        pre.textContent = cards[6].updateContent(event, [key, keycode, code, location, altKey, ctrlKey, metaKey, shiftKey]);

        // 渲染Unicode
        content[8].textContent = cards[8].updateContent(event, [keycode, key]);
        return;
      }
    })
  }
})


/**
 * 渲染卡片结构
 */
function generateCar(cardInfo) {
  const fragment = document.createDocumentFragment();
  for (let k in cardInfo) {
    const li = document.createElement('li');
    const title = document.createElement('div');
    title.classList.add('list_title');
    title.textContent = cardInfo[k]['title'];
    const frame = document.createElement('div');
    frame.classList.add('list_content');
    if (cardInfo[k]['frame'] instanceof DocumentFragment) {
      frame.appendChild(cardInfo[k]['frame']);
    } else {
      frame.textContent = cardInfo[k]['frame'];
    }
    const description = document.createElement('div');
    description.classList.add('list_mark');
    if (cardInfo[k]['description'] instanceof DocumentFragment) {
      description.appendChild(cardInfo[k]['description']);
    } else {
      description.textContent = cardInfo[k]['description'];
    }
    const list = [title, frame, description];
    list.forEach(item => {
      li.appendChild(item);
    })
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
}

/**
 * 动态渲染基础内容
 */
function renderCar(cardInfo) {
  const content = document.querySelectorAll('.list_content');
  // 渲染前五个卡片
  for (let i = 0; i < content.length - 5; i++) {
    if (cardInfo[i]['content'] instanceof DocumentFragment) {
      content[i].appendChild(cardInfo[i]['content']);
    } else {
      content[i].textContent = cardInfo[i]['content'];
    }
  }
  // 渲染Event Dump卡片
  const pre = document.querySelector('.dump pre');
  pre.textContent = cardInfo[6].content;
  // 渲染Similar Values卡片
  content[7].textContent = cardInfo[7]['content'];
  // 渲染Unicode卡片
  content[8].textContent = cardInfo[8]['content'];
}

/**
 * 渲染Meta Key卡片
 */
function renderMetaKey(event, metaKeys, arr) {
  cards[5].changeStatus(event, metaKeys, arr);
}

/**
 * 渲染History卡片
 */
function renderHistory() {
  const lastChild = historyBox.lastElementChild;
  let historyCode = cards[9].content;
  historyBox.prepend(historyCode);
  if (historyBox.children.length > 4) {
    historyBox.removeChild(lastChild);
  }
}

/**
 * 渲染标题
 */
function renderTitle(key) {
  smallTitle.textContent = key;
  bigTitle.textContent = key;
}

function keyup() {
  cards[5].onKeyup(metaKeys);
}