(function () {
    var lists = document.querySelectorAll('.list_content');
    var fnkeys = document.querySelectorAll('.fnkey');
    var dumps = document.querySelector('.dump').querySelectorAll('span');
    var unicode = document.querySelector('.unicode');
    var h1 = document.querySelector('.content').querySelector('h1');
    var code = document.querySelector('.code');
    var historyCode = document.querySelector('.historyCode');

    var which = 0;
    var history = [];
    var storeInfo = [];

    // 注册keydown事件，获取键盘的event事件，收集成数组，赋值到各个盒子中
    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        // 根据location不同的值展示不同的信息
        // DOM_KEY_LOCATION_STANDARD = 0
        // DOM_KEY_LOCATION_LEFT = 1
        // DOM_KEY_LOCATION_RIGHT = 2
        // DOM_KEY_LOCATION_NUMPAD = 3
        var locationType = ['Genneral Keys', 'Left-side modifier keys', 'Right-side modifier keys', 'Numpad'];
        var location = '';
        for (var i = 0; i < locationType.length; i++) {
            if (e.location === i) {
                location = locationType[i];
            }
        }
        // 将按键字符转换为数字
        which = e.key.charCodeAt();
        h1.innerHTML = 'JavaScript Key Code ' + which;
        code.innerHTML = which;
        var description = Description(e);
        // 功能键
        metaKey(e);
        // Dump
        Dump(e);
        // Unicode  48-57   
        Unicode(e)
        // History
        History(e, storeInfo);

        // 渲染数组
        var keycodeInformation = [];
        keycodeInformation.push(e.key, location, e.code, which, description);
        // 获取十个盒子的内容信息
        renderInfo(keycodeInformation);

        // 存储信息
        storeInfo.unshift(keycodeInformation.concat())
        // console.log(storeInfo);
    })

    // Description
    function Description(e) {
        var description = '';
        if (e.location == 0) {
            if (which >= 97 && which <= 122) {
                description = e.key;
            } else if (which >= 48 && which <= 57) {
                if (which == 48) {
                    description = e.key;
                } else {
                    description = e.key + 'Key';
                }
            } else {
                if (e.key == '-') {
                    description = 'minus(firefox),mute/unmte';
                } else if (e.key == '=') {
                    description = 'equals(firefox)';
                } else if (e.key == 'Backspace') {
                    description = 'backspace/delete';
                } else if (e.key == '\/') {
                    description = 'back slash';
                } else if (e.key == 'Enter') {
                    description = 'Enter/Return';
                } else if (e.key == '[') {
                    description = 'open bracket';
                } else if (e.key == ']') {
                    description = 'close bracket / å';
                } else if (e.key == ';') {
                    description = 'semicolon (firefox), equals';
                } else if (e.key == "'") {
                    description = 'single quote / ø / ä';
                } else if (e.key == ',') {
                    description = 'comma';
                } else if (e.key == '.') {
                    description = 'period';
                } else if (e.key == '/') {
                    description = 'forward slash / ç';
                } else if (e.key == 'Shift') {
                    description = 'No Description.';
                } else if (e.key == '`') {
                    description = 'Backtick / grave accent / ñ / æ / ö / § / ±';
                } else if (e.key == 'Tab') {
                    description = 'tab';
                } else if (e.key == 'CapsLock') {
                    description = 'caps lock';
                } else if (e.key == 'CapsLock') {
                    description = 'caps lock';
                } else if (e.key == 'Escape') {
                    description = 'escape';
                } else if (e.key == 'ArrowUp') {
                    description = 'up arrow';
                } else if (e.key == 'ArrowDown') {
                    description = 'down arrow';
                } else if (e.key == 'ArrowLeft') {
                    description = 'left arrow';
                } else if (e.key == 'ArrowRight') {
                    description = 'right arrow';
                } else {
                    description = 'No Description.';
                }
            }
        } else if (e.location == 3) {
            if (which >= 48 && which <= 57) {
                description = 'Number Pad' + e.key;
            } else {
                if (which === 78) {
                    description = 'num lock';
                } else if (which === 45) {
                    description = 'devide';
                } else if (which === 42) {
                    description = 'multiply';
                } else if (which === 47) {
                    description = 'subtract';
                } else if (which === 43) {
                    description = 'add';
                } else if (which === 46) {
                    description = 'decimal point';
                } else if (which === 69) {
                    description = 'No Description.';
                } else {
                    description = 'No Description.';
                }
            }

        } else if (e.location == 1) {
            if (e.key == 'Shift') {
                description = 'shift';
            } else if (e.key == 'Control') {
                description = 'ctrl';
            } else if (e.key == 'Meta') {
                description = 'Windows Key / Left ⌘ / Chromebook Search key';
            } else if (e.key == 'Alt') {
                description = 'Alt / Option';
            } else {
                description = 'No Description.';
            }

        } else if (e.location == 2) {
            if (e.key == 'Alt') {
                description = 'Alt / Option';
            } else if (e.key == 'Control') {
                description = 'ctrl';
            } else {
                description = 'No Description.';
            }
        } else {
            description = 'No Description.';
        }
        return description;
    }

    // 功能键
    function metaKey(e) {
        for (var i = 0; i < fnkeys.length; i++) {
            for (var i = 0; i < fnkeys.length; i++) {
                fnkeys[i].style.borderColor = '#ccc';
            }
            if (e.metaKey) {
                fnkeys[0].style.borderColor = 'black';
            } else if (e.shiftKey) {
                fnkeys[1].style.borderColor = 'black';
            } else if (e.altKey) {
                fnkeys[2].style.borderColor = 'black';
            } else if (e.ctrlKey) {
                fnkeys[3].style.borderColor = 'black';
            }
        }
        document.addEventListener('keyup', function () {
            for (var i = 0; i < fnkeys.length; i++) {
                fnkeys[i].style.borderColor = '#ccc';
            }
        })
    }

    // Dump
    function Dump(e, ...arg) {
        const [key, keyCode, dwhich, code, location] = [...arg];
        var e_altKey = false;
        var e_ctrlKey = false;
        var e_metaKey = false;
        var e_shiftKey = false;
        if (e.altKey) {
            e_altKey = true;
        } else if (e.ctrlKey) {
            e_ctrlKey = true;
        } else if (e.metaKey) {
            e_metaKey = true;
        } else if (e.shiftKey) {
            e_shiftKey = true;
        }
        var e_which = e.key ? which : '';
        var dumpInfo = [e.key || key, e_which || keyCode, e_which || dwhich, e.code || code, e.location || location, e_altKey, e_ctrlKey, e_metaKey, e_shiftKey];
        for (var i = 0; i < dumps.length; i++) {
            dumps[i].innerHTML = dumpInfo[i];
        }
    }

    // Unicode
    function Unicode(e, value) {
        if (which >= 48 && which <= 57) {
            unicode.innerHTML = e.key || value;
            unicode.style.borderColor = 'black';
        } else if (which >= 37 && which <= 40) {
            switch (true) {
                case 37: unicode.innerHTML = '←';
                    break;
                case 38: unicode.innerHTML = '↑';
                    break;
                case 39: unicode.innerHTML = '→';
                    break;
                case 40: unicode.innerHTML = '↓';
                    break;
                default: unicode.innerHTML = '';
                    break;
            }
        } else {
            unicode.innerHTML = '';
            unicode.style.borderColor = '#fff';
        }
    }

    // History
    function History(e) {
        // 存储历史记录
        history.unshift(e.key);
        localStorage.setItem('history', history.slice(0, 4));
        // 创建容器
        var div = document.createElement('div');
        div.classList.add('hcode');
        div.setAttribute('data-index', e.key)
        historyCode.prepend(div);
        div.innerHTML = history[0];
        // 循环渲染历史记录
        if (historyCode.children.length >= 4) {
            for (var i = 4; i < historyCode.children.length; i++) {
                historyCode.removeChild(historyCode.children[i]);
            }
        }
        // 绑定事件
        var codes = historyCode.querySelectorAll('.hcode');
        codes = Array.from(codes).slice(0, 4);
        div.addEventListener('mouseover', function () {
            for (var i = 0; i < codes.length; i++) {
                codes[i].style.borderColor = 'black';
            }
            this.style.borderColor = '#204ECF';
        })
        div.addEventListener('mouseout', function () {
            this.style.borderColor = 'black';
        })
        div.addEventListener('click', function (e) {
            for (var i = 0; i < codes.length; i++) {
                codes[i].style.borderColor = 'black';
            }
            this.style.borderColor = '#204ECF';
            // 重新渲染页面   把历史按键信息存储下来，当点击时重新渲染页面
            const dataIndex = this.getAttribute('data-index');
            storeInfo.slice(0, 4).forEach((item, index) => {
                arr = Array.from(item);
                if (arr.includes(dataIndex)) {
                    h1.innerHTML = 'JavaScript Key Code ' + arr[3];
                    code.innerHTML = arr[3];
                    renderInfo(storeInfo[index]);
                    Unicode(e, arr[0]);
                    Dump(e, arr[0], arr[3], arr[3], arr[2], arr[1]);
                }
            });
        })
    }

    // 渲染信息
    function renderInfo(arr) {
        for (var i = 0; i < lists.length - 5; i++) {
            lists[i].innerHTML = arr[i];
        }
    }
})()