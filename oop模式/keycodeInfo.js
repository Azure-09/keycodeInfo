import { EventKeyCard } from './js/EventKeyCard.js'
import { EventWhichCard } from './js/EventWhichCard.js';
import { EventLocationCard } from './js/EventLocationCard.js';
import { EventCodeCard } from './js/EventCodeCard.js';
import { DescriptionCard } from './js/DescriptionCard.js';
import { MetaKeysCard } from './js/MetaKeysCard.js';
import { EventDumpCard } from './js/EventDumpCard.js';
import { SimilarValueCard } from './js/SimilarValuesCard.js';
import { UnicodeCard } from './js/UnicodeCard.js';
import { HistoryCard } from './js/HistoryCard.js';


// 创建实例对象
const cards = [new EventKeyCard(), new EventLocationCard(), new EventCodeCard(), new EventWhichCard(), new DescriptionCard(), new MetaKeysCard(), new EventDumpCard(), new SimilarValueCard(), new UnicodeCard(), new HistoryCard()];


// 获取元素
const smallTitle = document.querySelector('.smallTitle');
const bigTitle = document.querySelector('.code');
const ul = document.querySelector('.list');

/**
 * 注册键盘按下事件
 */
window.addEventListener("keydown", (event) => {
  event.preventDefault();

  // 渲染标题
  const key = event.key.charCodeAt();
  renderTitle(key);

  // 遍历获取卡片的内容
  const cardInfo = cards.map(card => {
    card.onKeydown(event);
    return {
      title: card.getTitle(),
      content: card.getContent(),
      description: card.getDesc(),
    }
  })

  // 渲染卡片
  renderCar(cardInfo);
})

/**
 * 注册按键弹起事件
 */
window.addEventListener('keyup', keyup);

/**
 * 注册鼠标点击历史记录事件
 */
ul.addEventListener('click', function (event) {
  // 获取元素
  const historyBox = document.querySelector('.historyCode');
  const button = document.querySelector('.hcode');
  // 获取历史记录
  const getHistory = cards[cards.length - 1].getHistory();
  // 获取点击目标
  const target = event.target;
  // 绑定事件并重新渲染卡片
  if (target.tagName === button.tagName) {
    getHistory.forEach((item) => {
      const { key, keycode } = item;

      if (target.textContent === key) {
        // 渲染标题
        renderTitle(keycode);
        // 获取新数据
        const content = updateContent(event, item, historyBox);
        // 获取卡片底部数据
        const arr = [new EventKeyCard().getDesc(), new EventLocationCard().getDesc(), new EventCodeCard().getDesc(), new EventWhichCard().generateDesc(), new DescriptionCard().generateDesc()];
        // 遍历获取卡片的内容
        const cardInfo = cards.map((card, index) => {
          return {
            title: card.getTitle(),
            content: content[index],
            description: arr[index],
          }
        })
        // 渲染卡片
        renderCar(cardInfo);
        setTimeout(keyup, 100);
        return;
      }
    })
  }
});


/**
 * 渲染卡片结构
 */
function renderCar(cardInfo) {
  const fragment = document.createDocumentFragment();
  for (let k in cardInfo) {
    // 生成卡片
    const li = document.createElement('li');
    // 生成标题
    const title = document.createElement('div');
    title.classList.add('list_title');
    title.textContent = cardInfo[k]['title'];
    // 生成内容
    const content = document.createElement('div');
    content.classList.add('list_content');
    // 判断内容类型并渲染
    if (cardInfo[k]['content'] instanceof DocumentFragment) {
      content.appendChild(cardInfo[k]['content']);
    } else {
      content.textContent = cardInfo[k]['content'];
    }
    // 生成描述
    const description = document.createElement('div');
    description.classList.add('list_mark');
    // 判断描述信息类型并渲染
    if (cardInfo[k]['description'] instanceof DocumentFragment) {
      description.appendChild(cardInfo[k]['description']);
    } else {
      description.textContent = cardInfo[k]['description'];
    }
    // 渲染卡片
    const list = [title, content, description];
    list.forEach(item => {
      li.appendChild(item);
    })
    // 卡片插入文本片段
    fragment.appendChild(li);
  }
  // 卡片插入ul中
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  };
  ul.appendChild(fragment);
}


/**
 * 设置标题
 */
function renderTitle(key) {
  smallTitle.textContent = key;
  bigTitle.textContent = key;
}

/**
 * 弹起按键回调函数
 */
function keyup() {
  const keys = document.querySelectorAll('.fnkey');
  const metaKeys = new MetaKeysCard();
  metaKeys.onKeyup(keys);
}


/**
 * 处理更新后的信息
 */
function updateContent(event, arr, element) {
  const { key, location, code, keycode, description, metaKey, altKey, ctrlKey, shiftKey } = arr;
  const locationType = ['Genneral Keys', 'Left-side modifier keys', 'Right-side modifier keys', 'Numpad'];
  // 更新数据
  const updateMetaKeys = new MetaKeysCard().changeStatus(event, [metaKey, shiftKey, altKey, ctrlKey]);
  const updateEventDump = new EventDumpCard().updateContent(event, [key, keycode, code, location, altKey, ctrlKey, metaKey, shiftKey]);
  const updateSimilarValues = new SimilarValueCard().getContent();
  const updateUnicode = new UnicodeCard().updateContent(event, [keycode, key]);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  // 合并数据
  const content = [key, locationType[location], code, keycode, description, updateMetaKeys, updateEventDump, updateSimilarValues, updateUnicode, fragment];
  return content;
}