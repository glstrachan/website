/* Graydon Strachan 2024 */

const dialog = [
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
    { "text": "./introduction.bash\n" },
    { "text": "Hi, I'm Graydon Strachan, a Computer Engineering student at the University of British Columbia. I have a passion for tackling complex problems, with experience ranging from custom language compilers to autonomous aircraft systems.\n" },
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
    { "text": "cd ./projects\n" },
    { "text": "customCompiler.txt\n" },
    { "text": "javaServer.txt\n" },
    { "text": "neuralNetworkLibrary.txt\n" },
    { "text": "neuralSDFs.txt\n" },
    { "text": "rustTypingTest.txt\n" },
    { "text": "simpleRISCMachine.txt\n" },
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
]

const typingDelay = 40;

window.onload = () => {
    const currentDate = new Date().toString().split(' GMT')[0];
    const dateDialog = { text: `Login: ${currentDate}\n` }

    dialog.unshift(dateDialog);

    const terminal = document.getElementById('terminal');
    let line = document.createElement('div');
    terminal.appendChild(line);

    let charIndex = 0;
    let dialogIndex = 0;

    const cursor = document.createElement('a');
    cursor.classList.add('cursor');
    cursor.innerHTML = '▌';

    const typeChar = () => {
        if (dialogIndex < dialog.length) {
            const d = dialog[dialogIndex];
            const text = d.text;

            if (charIndex < text.length) {
                if (text[charIndex] === '\n') {
                    terminal.appendChild(line);
                    line = document.createElement('div');
                    terminal.appendChild(line);
                }

                const letter = document.createElement('a');

                if (d.class) letter.classList.add(d.class);
                letter.innerHTML = text[charIndex];
                letter.classList.add('terminaltext');
                line.appendChild(letter);
                line.appendChild(cursor);

                charIndex++;
                setTimeout(typeChar, typingDelay);
            } else {
                charIndex = 0;
                dialogIndex++;

                if (dialogIndex < dialog.length) setTimeout(typeChar, typingDelay * 4);
            }
        }
    }

    if (dialogIndex < dialog.length) typeChar();
}