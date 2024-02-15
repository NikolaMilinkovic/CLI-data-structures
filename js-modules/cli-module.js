/* eslint-disable no-alert */
import DisplaySection, { getDisplay } from './display-module.js';

const display = getDisplay();

const cliSection = document.getElementById('cli-section');

export default class CLIComponent {
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

    // Craetes next input and appends it to the cli-section
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
    // =====================================[\CLI METHODS]===================================== //


    // =====================================[CLI COMMANDS]===================================== //
    // Returns help command text
    getHelpText() {
        const text = [
            'Available commands:',
            ' - help',
            ' - run [algorithm name]',
            ' - clear',
            ' - git',
            ' - theme',
            ' - banner',
        ];
        return text.join('<br>');
    }

    // Displays help text on the screen
    displayHelp() {
        const para = document.createElement('pre');
        para.classList.add('cli-text');
        para.classList.add('cli-mar-left-2rem');
        para.innerHTML = this.getHelpText();

        this.cli.appendChild(para);
    }

    // Informs the user of invalid algorithm name
    algorithmNotFound(parameter, para) {
        if (parameter === undefined) {
            para.innerHTML = 'Please enter the name of the algorithm and try again<br>    example:<br>    run binary-search-tree';
            para.classList.add('cli-text');
            para.classList.add('cli-mar-left-2rem');
            this.cli.appendChild(para);
        } else {
            para.innerHTML = `${parameter}: algorithm not found`;
            para.classList.add('cli-text');
            para.classList.add('cli-mar-left-2rem');
            this.cli.appendChild(para);
        }
    }

    // Clears the CLI from previous inputs
    clearCLI() {
        while (cliSection.firstChild) {
            cliSection.removeChild(cliSection.firstChild);
        }
    }

    // Informs user that the command is not found
    commandNotFound(input, para) {
        para.innerHTML = `${input}: command not found`;
        para.classList.add('cli-text');
        para.classList.add('cli-mar-left-2rem');
        this.cli.appendChild(para);
    }


    // Method for evaluating user input
    evaluateInput(userInput) {
        const input = userInput.split(' ');
        const command = input[0];
        const parameter = input[1];
        const para = document.createElement('para');

        // Help
        if (command === 'help') {
            this.displayHelp();
        } else if (command === 'run') {
            // BST
            if (parameter === 'binary-search-tree' || parameter === 'bst' || parameter === 'BST') {
                display.display('bst');
            }
            // Linked list
            else if (parameter === 'linked-list') {
                display.display('linked-list');
            }
            // Algorithm not found
            else {
                this.algorithmNotFound(parameter, para);
            }
        }
        // Clear
        else if (command === 'clear') {
            this.clearCLI();
        }
        // Git
        else if (command === 'git') {
            alert('pong!');
        }
        // Theme
        else if (command === 'theme') {
            alert('pong!');
        }
        // Banner
        else if (command === 'banner') {
            this.getHero();
        }
        // Command not found
        else {
            this.commandNotFound(command, para);
        }
    }
    // =====================================[\CLI COMMANDS]===================================== //
}


const CLI = new CLIComponent('cli-section');
CLI.init();


// =====================================[EVENT LISTENERS]===================================== //
// Returns last input from the cli-section
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
            CLI.evaluateInput(lastInput.value);
            CLI.createInput();
        }
    }
});
// CLI section click event listener
cliSection.addEventListener('click', () => {
    const lastInput = returnLastInput();
    focusLastInput(lastInput);
});
// =====================================[\EVENT LISTENERS]===================================== //

