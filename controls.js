var keyState = {
};
const keyList = ["a", "b", "select", "start", "right", "left", 'up', 'down', 'r', 'l'];
const keyConvert = {
    "a" : 90,
    "b" : 88,
    "select" : 87,
    "start" : 81,
    "right" : 39,
    "left" : 37,
    "up" : 38,
    "down" : 40,
    "r" : 83,
    "l" : 65
}

function initVK() {
    var vks = document.getElementsByClassName('vk')
    for (var i = 0; i < vks.length; i++) {
        var vk = vks[i]
        var k = vks[i].getAttribute('data-k')
        keyState[k] = [vk, 0, 0]
    }
}
initVK()

function makeVKStyle(top, left, w, h, fontSize) {
    return 'top:' + top + 'px;left:' + left + 'px;width:' + w + 'px;height:' + h + 'px;' + 'font-size:' + fontSize + 'px;line-height:' + h + 'px;'
}


function adjustVKLayout() {
    var isLandscape = window.innerWidth > window.innerHeight
    var baseSize = Math.min(Math.min(window.innerWidth, window.innerHeight) * 0.14, 50)
    var fontSize = baseSize * 0.7
    var offTop = 0
    var offLeft = 0

    if (!isLandscape) {
        offTop = gbaHeight + baseSize
        if ((offTop + baseSize * 7) > window.innerHeight) {
            offTop = 0
        }
    }

    var vkw = baseSize * 3
    var vkh = baseSize

    keyState['l'][0].style = makeVKStyle(offTop + baseSize * 1.5, 0, vkw, vkh, fontSize)
    keyState['r'][0].style = makeVKStyle(offTop + baseSize * 1.5, window.innerWidth - vkw, vkw, vkh, fontSize)

    vkh = baseSize * 0.5
    //keyState['turbo'][0].style = makeVKStyle(offTop + baseSize * 0.5, 0, vkw, vkh, fontSize)
    //keyState['menu'][0].style = makeVKStyle(offTop + baseSize * 0.5, window.innerWidth - vkw, vkw, vkh, fontSize)

    vkh = baseSize
    vkw = baseSize
    offTop += baseSize * 3
    /*
    offLeft = isLandscape ? (baseSize * 1) : 0
    if (baseSize * 6 > window.innerWidth) {
        offLeft = 0
    }*/
    offLeft = 0

    keyState['up'][0].style = makeVKStyle(offTop, offLeft + vkw, vkw, vkh, fontSize)
    keyState['ul'][0].style = makeVKStyle(offTop, offLeft, vkw, vkh, fontSize)
    keyState['ur'][0].style = makeVKStyle(offTop, offLeft + vkw * 2, vkw, vkh, fontSize)
    keyState['down'][0].style = makeVKStyle(offTop + vkh * 2, offLeft + vkw, vkw, vkh, fontSize)
    keyState['dl'][0].style = makeVKStyle(offTop + vkh * 2, offLeft, vkw, vkh, fontSize)
    keyState['dr'][0].style = makeVKStyle(offTop + vkh * 2, offLeft + vkw * 2, vkw, vkh, fontSize)
    keyState['left'][0].style = makeVKStyle(offTop + vkh, offLeft + 0, vkw, vkh, fontSize)
    keyState['right'][0].style = makeVKStyle(offTop + vkh, offLeft + vkw * 2, vkw, vkh, fontSize)
    abSize = vkw * 1.3
    keyState['a'][0].style = makeVKStyle(offTop + vkh - baseSize * 0.5, window.innerWidth - abSize, abSize, abSize, fontSize)
    keyState['b'][0].style = makeVKStyle(offTop + vkh, window.innerWidth - abSize * 2.4, abSize, abSize, fontSize)

    vkh = baseSize * 0.5
    vkw = baseSize * 3

    offLeft = (window.innerWidth - vkw * 2.2) / 2
    offTop += baseSize * 3 + baseSize * 0.5
    if (isLandscape) {
        offTop = window.innerHeight - vkh
    }

    keyState['select'][0].style = makeVKStyle(offTop, offLeft, vkw, vkh, fontSize)
    keyState['start'][0].style = makeVKStyle(offTop, offLeft + vkw * 1.2, vkw, vkh, fontSize)


}

function adjustSize() {
    var gbaMaxWidth = window.innerWidth
    var gbaMaxHeight = window.innerHeight - 20
    var l = 0
    var w = gbaMaxWidth
    var h = w / 800 * 600
    if (h > gbaMaxHeight) {
        h = gbaMaxHeight
        w = h / 600 * 800
    }
    var scaleFator = (w / 800) // | 0
    gbaWidth = 800 * scaleFator
    gbaHeight = 600 * scaleFator
    l += (window.innerWidth - gbaWidth) / 2;
    // canvas.style = 'width:' + gbaWidth + 'px;height:' + gbaHeight + 'px;left:' + l + 'px;'
    adjustVKLayout()
}

window.onresize = adjustSize
window.onorientationchange = adjustSize
adjustSize()


function handleTouch(event) {
    /*
    tryInitSound()
    if (!isRunning) {
        return
    }
    */
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('vk-layer').hidden = false
    for (var k in keyState) {
        keyState[k][2] = 0
    }
    for (var i = 0; i < event.touches.length; i++) {
        var t = event.touches[i];
        var dom = document.elementFromPoint(t.clientX, t.clientY)
        if (dom) {
            var k = dom.getAttribute('data-k')
            if (k) {
                keyState[k][2] = 1
                if (k == 'ul') {
                    keyState['up'][2] = 1
                    keyState['left'][2] = 1
                } else if (k == 'ur') {
                    keyState['up'][2] = 1
                    keyState['right'][2] = 1
                } else if (k == 'dl') {
                    keyState['down'][2] = 1
                    keyState['left'][2] = 1
                } else if (k == 'dr') {
                    keyState['down'][2] = 1
                    keyState['right'][2] = 1
                }
            }
        }
    }
    if (keyState['menu'][2]) {
        // setPauseMenu(true)
    }
    /*if (keyState['turbo'][2] != keyState['turbo'][1]) {
        setTurboMode(keyState['turbo'][2])
    }*/
    for (var k in keyState) {
        // (HOPEFULLY) Simulate a key event...
        if (keyState[k][2] != keyState[k][1]) {
            if (keyState[k][2] == 0) {
                simulateKeyEvent("keyup", keyConvert[k])
            } else {
                simulateKeyEvent("keydown", keyConvert[k])
            }
        }

        // change the elements style idk
        if (keyState[k][1] != keyState[k][2]) {
            var dom = keyState[k][0]
            keyState[k][1] = keyState[k][2]
            if (keyState[k][1]) {
                dom.classList.add('vk-touched')
            } else {
                dom.classList.remove('vk-touched')
            }

        }
    }
}

['touchstart', 'touchmove', 'touchend', 'touchcancel', 'touchenter', 'touchleave'].forEach((val) => {
    window.addEventListener(val, handleTouch)
})

document.getElementById('vk-layer').ontouchstart = (e) => {
    e.preventDefault()
}

document.getElementById('emscripten_border').ontouchstart = (e) => {
    e.preventDefault()
}


// god I hope this works
function simulateKeyEvent(eventType, keyCode, charCode) {
    var e = document.createEventObject ? document.createEventObject() : document.createEvent("Events");
    if (e.initEvent) e.initEvent(eventType, true, true);

    e.keyCode = keyCode;
    e.which = keyCode;
    e.charCode = charCode;

    // Dispatch directly to Emscripten's html5.h API (use this if page uses emscripten/html5.h event handling):
    if (typeof JSEvents !== 'undefined' && JSEvents.eventHandlers && JSEvents.eventHandlers.length > 0) {
        for(var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if ((JSEvents.eventHandlers[i].target == Module['canvas'] || JSEvents.eventHandlers[i].target == window)
            && JSEvents.eventHandlers[i].eventTypeString == eventType) {
                JSEvents.eventHandlers[i].handlerFunc(e);
            }
        }
    } else {
        // Dispatch to browser for real (use this if page uses SDL or something else for event handling):
        Module['canvas'].dispatchEvent ? Module['canvas'].dispatchEvent(e) : Module['canvas'].fireEvent("on" + eventType, e);
    }
}
