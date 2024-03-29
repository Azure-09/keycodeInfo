<template>
    <nav>Toptal</nav>
    <div class="main">
        <div class="content">
            <h1>JavaScript Key Code <span class="smallTitle">{{ title ? 'title' : '?' }}</span></h1>
            <div class="code">{{ title ? title : '?' }}</div>
            <div class="information">Key Code Information</div>
            <ul class="list">
                <el-row :gutter="20">
                    <el-col :span="4" v-for="item in eventData" :key="item.title">
                        <el-card style="width: 220px;">
                            <template #header>
                                <div class="card-header">
                                    <span>{{ item.title }}</span>
                                </div>
                            </template>
                            <p class="text item">{{ item.content }}</p>
                            <template #footer>
                                <div v-html="handleFooter(item.footer)"></div>
                            </template>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-card style="width: 220px;">
                            <template #header>
                                <div class="card-header">
                                    <span>Meta Keys</span>
                                </div>
                            </template>
                            <div ref="metaBox" class="fnkeyAll">
                                <div class="fnkey">⌘</div>
                                <div class="fnkey">⇧</div>
                                <div class="fnkey">⌥</div>
                                <div class="fnkey">^</div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card style="width: 220px;">
                            <template #header>
                                <div class="card-header">
                                    <span>Event Dump</span>
                                </div>
                            </template>
                            <div class="dump">
                                <pre ref="dumpData"></pre>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card style="width: 220px;">
                            <template #header>
                                <div class="card-header">
                                    <span>History</span>
                                </div>
                            </template>
                            <p>NO</p>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card style="width: 220px;">
                            <template #header>
                                <div class="card-header">
                                    <span>Unicode</span>
                                </div>
                            </template>
                            <p ref="unicode"></p>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card style="width: 220px;">
                            <template #header>
                                <div class="card-header">
                                    <span>History</span>
                                </div>
                            </template>
                            <div ref="buttonBox" class="historyCode" @click="renderHistory">

                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 数据
const eventContent = reactive([]);
const eventData = reactive([
    {
        title: 'event.key',
        content: '',
        footer: 'The value of the key pressed. Accounts for modifiers keys that return CAPS and alternate chars.'
    },
    {
        title: 'event.location',
        content: '',
        footer: 'Some keys exist more than once on your keyboard. This provides the location of the key pressed. Try it with both shifts.'
    },
    {
        title: 'event.code',
        content: '',
        footer: "The physical key on the keyboard. Doesn't care if you are holding a modifier like Shift.",
    },
    {
        title: 'event.which',
        content: '',
        footer: [
            {
                elementType: '',
                text: 'event.which and event.keyCode are '
            },
            {
                elementType: 'a',
                text: 'deprecated',
                attrs: [
                    { name: 'href', value: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent' },
                    { name: 'target', value: '_blank' }
                ]
            },
            {
                elementType: '',
                text: ' in modern browsers. Use '
            },
            {
                elementType: 'code',
                text: '.key'
            },
            {
                elementType: '',
                text: ' or '
            },
            {
                elementType: 'code',
                text: '.code'
            },
            {
                elementType: '',
                text: ' instead'
            }
        ]
    },
    {
        title: 'Description',
        content: '',
        footer: [
            {
                elementType: '',
                text: 'This is the description we have created. Think it can be improved?',
            },
            {
                elementType: 'a',
                text: ' PR us on GitHub',
                attrs: [
                    { name: 'href', value: 'https://github.com/toptal/keycodes' },
                    { name: 'target', value: '_blank' }
                ]
            }
        ]
    },

]);

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
];

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

const locationType = ['Genneral Keys', 'Left-side modifier keys', 'Right-side modifier keys', 'Numpad'];

const buttonBox = ref(null);
const metaBox = ref(null);
const dumpData = ref(null);
const unicode = ref(null);
const title = ref('');
const historyCode = reactive([]);

/**
 * 事件
 */
// 注册键盘按下事件
window.addEventListener('keydown', (event) => {
    event.preventDefault();

    title.value = event.key.charCodeAt();

    Object.assign(eventContent, [event.key, locationType[event.location], event.code, event.key.charCodeAt(), getDescription(event)])

    eventData.forEach((item, index) => {
        item.content = eventContent[index];
    })

    changeStatus(event);
    getEventDump(event);
    getUnicode(event);
    getHistory(event);

    // 收集历史记录
    historyCode.unshift([...eventContent, event.metaKey, event.altKey, event.ctrlKey, event.shiftKey]);
    if (historyCode.length > 4) {
        historyCode.pop();
    }
})

window.addEventListener('keyup', () => {
    keyup();
})



/**
 * 处理卡片底部文字信息
 */
function handleFooter(footer) {
    let div = document.createElement('div');
    if (footer instanceof Array) {
        footer.map((item) => {
            const { elementType, text, attrs } = item;
            if (!elementType) {
                div.appendChild(document.createTextNode(text));
                return;
            }

            const elm = document.createElement(elementType);
            elm.textContent = text;

            if (attrs) {
                attrs.forEach((attr) => {
                    let { name, value } = attr;
                    elm.setAttribute(name, value);
                });
            }
            div.appendChild(elm);
        })
        return div.innerHTML;
    } else {
        return footer;
    }
}

/**
 * 生成Description卡片的内容
 */
function getDescription(event) {
    const keyCode = event.key.charCodeAt();
    let content = '';
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
    return content;
}

/**
 * 处理Meta Keys卡片内容
 */
// 改变功能键状态
function changeStatus(event, arr = []) {
    const [metaKey, shiftKey, altKey, ctrlKey] = arr;
    // console.log(arr);
    const elements = metaBox.value.children;
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

/**
 * 处理Event Dump卡片内容
 */

// 改变内容
function getEventDump(event, arr = []) {
    let [key, keycode, code, location, altKey, ctrlKey, metaKey, shiftKey] = arr;

    let which = event.key ? event.key.charCodeAt() : '';

    let keys = which ? [event.key, which, event.code, event.location, event.altKey, event.ctrlKey, event.metaKey, event.shiftKey] : [key, keycode, code, location, altKey, ctrlKey, metaKey, shiftKey];

    console.log(keys);

    dumpData.value.textContent = `
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
}

/**
 * 处理Unicode卡片内容
 */
function getUnicode(event, arr = []) {
    let [keycode, unicodeKey] = arr;
    let eventKey = event.key ? event.key.charCodeAt() : ''
    let key = eventKey || keycode;
    if (key >= 48 && key <= 57) {
        unicode.value.textContent = event.key || unicodeKey;
    } else {
        unicode.value.textContent = ((event.key in unicodeMap) || (unicodeKey in unicodeMap)) ? (unicodeMap[event.key] || unicodeMap[unicodeKey]) : '';
    }
}

/**
 * 处理History卡片内容
 */
function getHistory(event) {
    const content = [];
    content.unshift(event.key);
    if (content.length > 4) {
        content.pop();
    }

    const button = document.createElement('button');
    button.classList.add('hcode');
    button.textContent = content[0];
    buttonBox.value.prepend(button);

    if (buttonBox.value.children.length > 4) {
        buttonBox.value.removeChild(buttonBox.value.lastElementChild);
    }
}

function keyup() {
    const divBox = metaBox.value;
    const elements = divBox.children;
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('changeStatus');
    }
}

function renderHistory(event) {
    const target = event.target;
    let location = '';
    if (target.tagName.toLowerCase() === 'button') {
        historyCode.slice(0, 4).forEach((item) => {
            const [key, locationType, code, keycode, description, metaKey, altKey, ctrlKey, shiftKey] = item;

            if (locationType == 'Genneral Keys') {
                location = 0;
            } else if (locationType == 'Left-side modifier keys') {
                location = 1;
            } else if (locationType == 'Right-side modifier keys') {
                location = 2;
            } else if (locationType == 'Numpad') {
                location = 3;
            }

            if (item.indexOf(target.textContent) !== -1) {
                console.log(item);
                // 渲染标题
                title.value = keycode;
                // 渲染前五个卡片
                Object.assign(eventContent, [key, location, code, keycode, description]);
                eventData.forEach((item, index) => {
                    item.content = eventContent[index];
                })
                // 渲染Meta Keys卡片
                changeStatus(event, [metaKey, shiftKey, altKey, ctrlKey]);
                setTimeout(() => {
                    keyup();
                }, 100)
                // 渲染Event Dump卡片
                getEventDump(event, [key, keycode, code, location, altKey, ctrlKey, metaKey, shiftKey])
                // 渲染Unicode卡片
                getUnicode(event, [keycode, key]);

                return;
            }
        })
    }
}

</script>

<style lang="less" scoped>
.changeStatus {
    border-color: #262D3D !important;
    color: #262D3D !important;
}

.fnkeyAll,
.historyCode {
    width: 130px;
    height: 122px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    ::v-deep .hcode,
    .fnkey {
        width: 60px;
        height: 50px;
        font-size: 16px;
        background-color: transparent;
        margin-bottom: 10px;
        overflow: hidden;
    }

    .fnkey {
        border: 2px solid #c4c6ca;
        align-content: center;
        color: #c4c6ca;
        font-size: 22px;
        box-sizing: border-box;
    }

    ::v-deep .hcode {
        cursor: pointer;
    }

    ::v-deep .hcode:hover {
        border-color: #204ECF;
        color: #204ECF;
    }
}

.dump {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
}

::v-deep .el-card__header {
    background-color: #204ECF;
    color: aliceblue;
    text-align: center;
    padding: 8px 16px;
    font-size: 16px;
}

::v-deep .el-card__footer {
    font-size: 12px;
    background-color: #EBECED;
    color: #262D3D;
    line-height: 20px;
}

::v-deep .el-card__body {
    text-align: center;
    font-size: 26px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-card {
    height: 310px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.el-row {
    margin-bottom: 20px;
    justify-content: space-between;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

nav {
    width: 100%;
    height: 56px;
    background-color: #204ECF;
    border-top-left-radius: 10px;
    padding: 16px 32px;
    box-sizing: border-box;
    color: aliceblue;
    font-size: large;
}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content {
        width: 1258px;
        min-height: calc(100vh-64px);
        padding: 24px 32px 40px 32px;
        box-sizing: border-box;

        h1 {
            color: #262D3D;
            font-size: 28px;
            font-weight: 400;
            line-height: 42px;
            text-align: center;
            padding: 0;
            margin: 0;

            @media screen and (max-width:767px) {
                font-size: 20px;
                line-height: 30px;
            }
        }

        .code {
            color: #262D3D;
            font-size: 200px;
            line-height: 220px;
            font-weight: 400;
            text-align: center;
            padding-top: 12px;

            @media screen and (max-width:767px) {
                font-size: 184px;
                line-height: 184px;
            }
        }

        .information {
            color: #262D3D;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            text-align: center;
        }

    }
}
</style>