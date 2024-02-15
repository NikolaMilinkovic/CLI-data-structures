

class CLIComponent {
    constructor(elementId, userType = 'guest', userName = 'cli-algorithms') {
        this.cli = document.getElementById(elementId);
        this.userType = userType;
        this.userName = userName;
    }

    // Handles innitializing the cli section
    init() {
        this.getHero();
        this.createInput();
    }

    // =====================================[HERO METHODS]===================================== //
    // Method for displaying the hero text
    getHero() {
        const asciiText = this.getHeroText();
        const subText = this.getHeroSubtext();

        const heroContainer = document.createElement('pre');
        heroContainer.setAttribute('id', 'hero-container');

        const hero = document.createElement('para');
        hero.classList.add('hero-text');
        hero.innerHTML = asciiText;
        heroContainer.appendChild(hero);

        const instructions = document.createElement('para');
        instructions.classList.add('cli-text');
        instructions.innerHTML = subText;
        heroContainer.appendChild(instructions);

        this.cli.appendChild(heroContainer);
    }

    // Method that returns Ascii hero text
    getHeroText() {
        const asciiText = [
            '   ██████╗██╗     ██╗       █████╗ ██╗      ██████╗  ██████╗ ██████╗ ██╗████████╗██╗  ██╗███╗   ███╗███████╗',
            '  ██╔════╝██║     ██║      ██╔══██╗██║     ██╔════╝ ██╔═══██╗██╔══██╗██║╚══██╔══╝██║  ██║████╗ ████║██╔════╝',
            '  ██║     ██║     ██║█████╗███████║██║     ██║  ███╗██║   ██║██████╔╝██║   ██║   ███████║██╔████╔██║███████╗',
            '  ██║     ██║     ██║╚════╝██╔══██║██║     ██║   ██║██║   ██║██╔══██╗██║   ██║   ██╔══██║██║╚██╔╝██║╚════██║',
            '  ╚██████╗███████╗██║      ██║  ██║███████╗╚██████╔╝╚██████╔╝██║  ██║██║   ██║   ██║  ██║██║ ╚═╝ ██║███████║',
            '   ╚═════╝╚══════╝╚═╝      ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝',
            ' ',
            ' ',
        ];
        return asciiText.join('<br>');
    }

    // Method that returns hero subtext
    getHeroSubtext() {
        const text = [
            '   Welcome to CLI-Algorithms to select an algorithm type',
            '   ',
            '       run [algorithm name]',
            '   ',
            '       example:',
            '       run binary-search-tree',
            '   ',
            '   Type \'help\'for help and list of options/commands.',
        ];

        return text.join('<br>');
    }
    // =====================================[\HERO METHODS]===================================== //


    // =====================================[CLI METHODS]===================================== //

    // Returns an array of
    getUser() {
        const userType = document.createElement('span');
        userType.classList.add('cli-text');
        userType.classList.add('user-type');
        userType.textContent = this.userType;

        const symbolsFirst = document.createElement('span');
        symbolsFirst.classList.add('cli-text');
        symbolsFirst.classList.add('symbols');
        symbolsFirst.textContent = '@';

        const userName = document.createElement('span');
        userName.classList.add('cli-text');
        userName.classList.add('user-name');
        userName.textContent = this.userName;

        const symbolsSecond = document.createElement('span');
        symbolsSecond.classList.add('cli-text');
        symbolsSecond.classList.add('symbols');
        symbolsSecond.textContent = ':~$ ';


        return [userType, symbolsFirst, userName, symbolsSecond];
    }

    createInput() {
        const para = document.createElement('pre');
        para.classList.add('user-input-el');
        const input = document.createElement('input');
        const userElements = this.getUser();

        userElements.forEach((element) => {
            para.appendChild(element);
        });

        para.appendChild(input);
        this.cli.appendChild(para);
        input.focus();
    }
}


const CLI = new CLIComponent('cli-section');
CLI.init();

// Returns last input from the cli-section
const cliSection = document.getElementById('cli-section');
function returnLastInput() {
    const inputs = cliSection.querySelectorAll('input');
    const lastInput = inputs[inputs.length - 1];
    return lastInput;
}
// Focuses the input provided as argument
function focusLastInput(input) {
    input.focus();
}

// CLI enter event listener
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const lastInput = returnLastInput();
        if (lastInput.value !== '') {
            lastInput.disabled = true;
            CLI.createInput();
        }
        console.log('enter pressed');
    }
});
// CLI section click event listener
cliSection.addEventListener('click', () => {
    const lastInput = returnLastInput();
    focusLastInput(lastInput);
});


