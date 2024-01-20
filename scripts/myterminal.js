/* Graydon Strachan 2024 */

const dialog = [
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
    { "text": "./introduction.bash\n" },
    { "text": "Hi, I'm " },
    { "text": "Graydon Strachan", "class": "textbold" },
    { "text": ", a " },
    { "text": "Computer Engineering", "class": "textbold" },
    { "text": " student at the " },
    { "text": "University of British Columbia", "class": "textbold" },
    { "text": ". I have a passion for tackling complex problems, with experience ranging from custom language compilers to machine learning and biomedical devices.\n" },
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
    { "text": "cd ./projects\n" },
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
    { "text": "ls\n" },
    { "text": "customCompiler.txt\n", "onclick": "displayProject('customCompiler')" },
    { "text": "javaServer.txt\n", "onclick": "displayProject('javaServer')" },
    { "text": "neuralNetworkLibrary.txt\n", "onclick": "displayProject('neuralNetworkLibrary')" },
    { "text": "neuralSDFs.txt\n", "onclick": "displayProject('neuralSDFs')" },
    { "text": "rustTypingTest.txt\n", "onclick": "displayProject('rustTypingTest')" },
    { "text": "simpleRISCMachine.txt\n", "onclick": "displayProject('simpleRISCMachine')" },
    { "text": "glstrachan@website", "class": "textpurple" }, { "text": ":" }, { "text": " ~$ ", "class": "textcyan" },
]

const typingDelay = 20;

window.onload = () => {
    document.getElementById('cursorpos').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;

    const currentDate = new Date().toString().split(' GMT')[0];
    const dateDialog = { text: `Login: ${currentDate}\n` }

    dialog.unshift(dateDialog);

    displayText();
}

const displayText = () => {
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

                    /*if(dialog[dialogIndex].text.includes('cd')) {
                        const dir = document.getElementById('directory');
                        dir.innerHTML = dir.innerHTML + dialog[dialogIndex].text.split('cd .')[1].trim() + '/';
                    }*/
                }

                const letter = document.createElement('a');

                if (d.class) letter.classList.add(d.class);
                if(d.onclick) letter.setAttribute('onclick', d.onclick);

                letter.innerHTML = text[charIndex];
                letter.classList.add('terminaltext');
                line.appendChild(letter);
                line.appendChild(cursor);

                charIndex++;

                terminal.scrollTop = terminal.scrollHeight;

                if(text[charIndex] === ' ') setTimeout(typeChar, typingDelay * 2);
                else setTimeout(typeChar, typingDelay * (Math.random() * 0.7 + 0.5));
                
            } else {
                charIndex = 0;
                dialogIndex++;

                if (dialogIndex < dialog.length) setTimeout(typeChar, typingDelay * 4);
            }
        }
    }

    if (dialogIndex < dialog.length) typeChar();
}

const displayProject = (project) => {
    switch(project) {
        case 'customCompiler':
            dialog = [];
            break;
        case 'javaServer':
            dialog = [];
            break;
    }
}