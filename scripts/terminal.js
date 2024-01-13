/**
 */

/**
 * @typedef {{ color?: string, bold?: boolean, italic?: boolean, delay?: number, mergeNext?: boolean }} Format
 * @typedef {{ text: string, format?: Format, element: HTMLElement }} DialogText
 * @typedef {{ text: string | DialogText[], format?: Format, element?: HTMLParagraphElement }} Dialog
 */

const colors = {
    'red': '#C50F1F',
    'green': '#99D3A4',
    'yellow': '#C19C00',
    'blue': '#0037DA',
    'purple': '#881798',
    'cyan': '#3A96DD',
    'white': '#CCCCCC',
    'purple': '#BF94E4',

    'brightRed': '#E74856',
    'brightGreen': '#16C60C',
    'brightYellow': '#F9F1A5',
    'brightBlue': '#3B78FF',
    'brightPurple': '#B4009E',
    'brightCyan': '#61D6D6',
    'brightWhite': '#F2F2F2',
};

/**
 * @type {Dialog[]}
 */
const terminalDiaglog = [
    {
        text: [{ text: ' ' }]
    },
    {
        text: [
            { text: 'glstrachan@website', format: { color: 'purple', mergeNext: true } },
            { text: ': ', format: { mergeNext: true } },
            { text: '~$ ', format: { color: 'green', mergeNext: true } },
            { text: './introduction.bash', format: { delay: 1000 } },
        ]
    },
    {
        text: [{ text: ' ' }]
    },
    {
        text: [
            { text: 'Hi, I\'m Graydon Strachan, a Computer Engineering student at the University of British Columbia. I have a passion for tackling complex problems, with experience ranging from custom language compilers to autonomous aircraft systems.' },
        ]
    },
    {
        text: [{ text: ' ' }]
    },
    {
        text: [
            { text: 'glstrachan@website', format: { color: 'purple', mergeNext: true } },
            { text: ': ', format: { mergeNext: true } },
            { text: '~$ ', format: { color: 'green', mergeNext: true } },
            { text: 'cd ./projects', format: { delay: 20 } },
        ]
    },
    {
        text: [
            { text: 'glstrachan@website', format: { color: 'purple', mergeNext: true } },
            { text: ': ', format: { mergeNext: true } },
            { text: '~$ ', format: { color: 'green', mergeNext: true } },
            { text: 'ls', format: { delay: 20 } },
        ]
    },
    {text: [{ text: 'customCompiler.txt' }]},
    {text: [{ text: 'neuralNetworkLibrary.txt' }]},
    {text: [{ text: 'neuralSDFs.txt' }]},
    {text: [{ text: 'rustTypingTest.txt' }]},
    {text: [{ text: 'javaServer.txt' }]},
    {text: [{ text: 'simpleRISCMachine.txt' }]},
    {
        text: [
            { text: 'glstrachan@website', format: { color: 'purple', mergeNext: true } },
            { text: ': ', format: { mergeNext: true } },
            { text: '~$ ', format: { color: 'green', mergeNext: true } },
        ]
    },
];

//const hasDoneAnimation = localStorage.getItem('hasDoneAnimation');
const hasDoneAnimation = false;

const TYPING_RATE = 30;
const BLINK_RATE = 1000;

class Caret {
    constructor() {
        this.caret = document.createElement('span');
        this.caret.style.display = 'inline-block';
        this.caret.style.width = 'calc(1.875rem / 2.0)';
        this.caret.style.height = '1.765rem';
        this.caret.style.transform = 'translateY(2px)';
        this.caret.style.backgroundColor = '#ffffff4f';
    }

    blink() {
        this.onBlink();
        this.blinkInterval = setInterval(this.onBlink.bind(this), BLINK_RATE);
    }

    stopBlink() {
        clearInterval(this.blinkInterval);
    }

    onBlink() {
        this.caret.style.opacity = 1.0 - Number(this.caret.style.opacity);
    }

    /**
     * @param {HTMLElement} element 
     */
    addTo(element) {
        element.appendChild(this.caret);
    }
}

window.onload = () => {
    const currentDate = new Date().toString().split(' GMT')[0];
    const dateDialog = { text: [{ text: `Login: ${currentDate}` }] };

    terminalDiaglog.unshift(dateDialog);

    const terminalContent = document.querySelector('#terminal-content');

    let terminalIndex = 0;
    let firstIndex = 0;
    let secondIndex = 0;
    let buffers = ['', ''];

    let interval;
    const caret = new Caret();

    if (!hasDoneAnimation) {
        interval = setInterval(nextCharacter, TYPING_RATE);
        localStorage.setItem('hasDoneAnimation', true);
    } else {
        addAll();
    }


    function doneTyping() {
        caret.blink();
    }

    function addAll() {
        let last
        for (const dialog of terminalDiaglog) {
            const newP = document.createElement('p');
            dialog.element = newP;

            terminalContent.append(newP);

            if (typeof dialog.text === 'string') {
                newP.innerText = dialog.text;
            } else {
                for (const text of dialog.text) {
                    const newSpan = document.createElement('div');
                    let builder = '';
                    builder = text.text;

                    if (!text.format?.mergeNext) {
                        builder += ' ';
                    }

                    if (text?.format?.color) {
                        const color = colors[text.format.color];
                        newSpan.style.color = color ?? format.color;
                    }

                    if (text?.format?.bold) {
                        newSpan.style.fontWeight = 'bold';
                    }

                    if (text?.format?.italic) {
                        newSpan.style.fontStyle = 'italic';
                    }

                    newSpan.innerText = builder;
                    newP.appendChild(newSpan);
                }
            }
            
            last = dialog
        }

        if (last?.element) {
            caret.addTo(last.element);
            caret.blink();
        } else {
            caret.addTo(terminalContent);
        }
    }

    /**
     * @param {Dialog} dialog 
     * @param {HTMLElement} appendTo
     */
    function formatNext(dialog, appendTo, bufferIndex, index = firstIndex, tag = 'p') {
        if (typeof dialog.text === 'string') {
            const character = dialog.text[index];
            if (index === 0) {
                const newElement = document.createElement(tag);
                dialog.element = newElement;

                const format = dialog.format;
                if (format) {
                    if (format.color) {
                        const color = colors[format.color];
                        newElement.style.color = color ?? format.color;
                    }

                    if (format.bold) {
                        newElement.style.fontWeight = 'bold';
                    }

                    if (format.italic) {
                        newElement.style.fontStyle = 'italic';
                    }
                }

                appendTo.appendChild(newElement);
            }

            let char;
            switch (character) {
                //case ' ': char = '&nbsp;'; break;
                case undefined: char = ''; break;
                default: char = character; break;
            }

            buffers[bufferIndex] += char;
            dialog.element.innerHTML = buffers[bufferIndex];

            return dialog;
        } else {
            if (index === 0 && secondIndex == 0) {
                const newElement = document.createElement(tag);
                dialog.element = newElement;

                appendTo.appendChild(newElement);
            }

            const format = dialog.text[index];
            return formatNext(format, dialog.element, 1, secondIndex, 'span');
        }
    }

    function nextCharacter() {
        const dialog = terminalDiaglog[terminalIndex];

        const baseDialog = formatNext(dialog, terminalContent, 0);
        caret.addTo(baseDialog.element);

        if (typeof dialog.text === 'string') {
            // Simple string

            firstIndex++;
            if (firstIndex >= dialog.text.length) {
                firstIndex = 0;
                terminalIndex++;
                buffers[0] = '';
                buffers[1] = '';
            }
        } else {
            secondIndex++;
            if (secondIndex >= dialog.text[firstIndex].text.length) {
                secondIndex = 0;
                firstIndex++;

                if (dialog.text[firstIndex - 1]?.format?.mergeNext) {
                    buffers[1] = '';
                } else {
                    buffers[1] = '&nbsp;';
                }

                // Execute delay on each format
                if (dialog.text[firstIndex - 1]?.format?.delay) {
                    caret.blink();

                    clearInterval(interval);
                    setTimeout(() => {
                        caret.stopBlink();
                        interval = setInterval(nextCharacter, TYPING_RATE);
                    }, dialog.text[firstIndex - 1].format?.delay);
                }
            }

            if (firstIndex >= dialog.text.length) {
                firstIndex = 0;
                terminalIndex++;
                buffers[0] = '';
                buffers[1] = '';
            }
        }


        if (terminalIndex >= terminalDiaglog.length) {
            clearInterval(interval);
            doneTyping();
        }
    }
};

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}