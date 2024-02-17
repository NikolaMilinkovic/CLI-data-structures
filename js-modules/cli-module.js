/* eslint-disable no-alert */
import DisplaySection, { getDisplay } from './display-module.js';
import HistoryTracker, { getHistory } from './history-tracker.js';
import Themes, { getThemes } from './themes.js';
import Autocomplete, { getAutocomplete } from './autocomplete.js';
import {
    createDiv, createPara, createLink, appendChildren,
} from './element-builder.js';

const history = getHistory();
const themes = getThemes();
const display = getDisplay();
const autocomplete = getAutocomplete();

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
            '   To see a list of available algorithms type \'algorithms\'',
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
        input.autocomplete = 'off';
        const userElements = this.getUser();

        const span = document.createElement('span');
        span.classList.add('suggestion-span');

        userElements.forEach((element) => {
            para.appendChild(element);
        });

        para.appendChild(input);
        para.appendChild(span);
        this.cli.appendChild(para);

        const bodyStyle = window.getComputedStyle(document.body);
        const contentStyle = window.getComputedStyle(document.getElementById('content'));
        const bodyPaddingLeft = parseFloat(bodyStyle.paddingLeft);
        const contentPaddingLeft = parseFloat(contentStyle.paddingLeft);
        span.style.width = `${input.offsetWidth}px`;
        span.style.height = `${input.offsetHeight}px`;
        span.style.position = 'absolute';
        span.style.left = `${input.offsetLeft - bodyPaddingLeft - contentPaddingLeft - 1}px`;
        span.style.zIndex = '1';
        span.style.color = '#868686';

        para.style.position = 'relative';

        this.addInputEventListener();
        input.focus();
    }

    addInputEventListener() {
        const lastInput = returnLastInput();
        this.inputListener = (event) => {
            autocomplete.findMatch(lastInput.value, lastInput);
            if (lastInput.value === '') {
                autocomplete.resetSpan();
            }
        };

        lastInput.addEventListener('input', this.inputListener);
    }

    removeInputEventListener() {
        const lastInput = returnLastInput();
        lastInput.removeEventListener('input', this.inputListener);
    }
    // =====================================[\CLI METHODS]===================================== //


    // =====================================[CLI COMMANDS]===================================== //
    // Returns help command text
    getHelpText() {
        const text = [
            'Available commands:',
            ' - help',
            ' - run [algorithm name]',
            ' - algorithms',
            ' - clear',
            ' - git',
            ' - themes',
            ' - theme [theme name]',
            ' - banner',
        ];
        return text.join('<br>');
    }

    // Returns the list of available algorithms
    getAlgorithmList() {
        return [
            'bst',
            'binary-search-tree',
            'linked-list',
        ];
    }

    // Displays help text on the screen
    displayHelp() {
        const para = document.createElement('pre');
        para.classList.add('cli-text');
        para.classList.add('cli-mar-left-2rem');
        para.innerHTML = this.getHelpText();

        this.cli.appendChild(para);
    }

    // Returns algorithms command text
    getAlgorithmsText() {
        const text = [
            'Available algorithms:',
            '   ',
            ' - binary-search-tree',
            ' - linked-list',
            '   ',
            'To select an algorithm type run [algorithm name]',
            '   ',
            '   example:',
            '   run binary-search-tree',
            '   ',
        ];
        return text.join('<br>');
    }

    // Displays algorith list on the screen
    displayAlgorithms() {
        const para = document.createElement('pre');
        para.classList.add('cli-text');
        para.classList.add('cli-mar-left-2rem');
        para.innerHTML = this.getAlgorithmsText();

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

    // Method for creating and displaying a para element
    printLine(input, className, indentation) {
        const para = document.createElement('pre');
        para.innerHTML = `${indentation}${input}`;
        para.classList.add('cli-text');
        para.classList.add('display-margins');
        if (className !== '') para.classList.add(className);
        this.cli.appendChild(para);
    }
    // =====================================[\CLI COMMANDS]===================================== //


    // ====================================[EVALUATE INPUT]==================================== //
    // Method for evaluating user input
    evaluateInput(userInput) {
        const input = userInput.split(' ');
        const command = input[0];
        const parameter = input[1];
        const para = document.createElement('para');

        // Help
        if (command === 'help') {
            this.displayHelp();
        }
        // Run
        else if (command === 'run') {
            this.run(parameter, para);
        }
        // Algorithms
        else if (command === 'algorithms') {
            this.displayAlgorithms();
        }
        // Clear
        else if (command === 'clear') {
            this.clearCLI();
        }
        // Git
        else if (command === 'git') {
            this.printGit('https://github.com/NikolaMilinkovic/CLI-Algorithms', 'NikolaMilinkovic/CLI-Algorithms', '         ');
        }
        // Themes
        else if (command === 'themes') {
            this.printThemes();
        }
        // Theme [theme name]
        else if (command === 'theme') {
            this.setTheme(command, parameter, para);
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


    // Method for printing the themes list
    printThemes() {
        const themesList = themes.getThemesList();
        const parent = createDiv(['cli-text', 'display-margins', 'themes-container'], '');

        // containers for theme printing
        const left = createDiv(['cli-text', 'display-margins', 'print-themes-section'], '');
        const middle = createDiv(['cli-text', 'display-margins', 'print-themes-section'], '');
        const right = createDiv(['cli-text', 'display-margins', 'print-themes-section'], '');

        this.printLine('Available themes:', '', '   ');
        let i = 0;

        // prints each theme inside its corrensponding container
        themesList.forEach((theme) => {
            if (i < 5) this.printThemeLine(theme, '', '     - ', left);
            if (i >= 5 && i < 10) this.printThemeLine(theme, '', '     - ', middle);
            if (i >= 10 && i < 15) this.printThemeLine(theme, '', '     - ', right);
            i++;
        });

        appendChildren(parent, [left, middle, right]);
        this.cli.appendChild(parent);
    }

    printThemeLine(input, className, indentation, parent) {
        const para = document.createElement('pre');
        para.innerHTML = `${indentation}${input}`;
        para.classList.add('cli-text');
        para.classList.add('display-margins');
        if (className !== '') para.classList.add(className);
        parent.appendChild(para);
    }

    // Method for setting the theme
    setTheme(command, parameter, para) {
        const theme = themes.findTheme(parameter);
        if (theme) themes.setTheme(theme);
        else if (parameter) {
            const fullCommand = `${command} ${parameter}`;
            this.commandNotFound(fullCommand, para);
        } else {
            parameter = '';
            const fullCommand = command + parameter;
            this.commandNotFound(fullCommand, para);
        }
    }

    // Handles the run command
    run(parameter, para) {
        const algorithmList = this.getAlgorithmList();
        // If parameter is found inside algorithmList
        if (algorithmList.includes(parameter)) display.display(parameter);
        // If perameter is not found write out error
        else this.algorithmNotFound(parameter, para);
    }

    // Method for printing link to project git repo
    printGit(gitURL, displayText, indentation) {
        const parent = createDiv(['git-container']);
        this.printLine('Click on the link bellow to access this project repo', '', '      ');
        const para = createPara(`${indentation}  [${displayText}]`, ['cli-text', 'display-margins', 'link-style'], '', 'pre');
        const link = createLink(gitURL);
        link.appendChild(para);
        parent.appendChild(link);

        this.cli.appendChild(parent);
        this.printLine('Thank you for checking out this project! :)', '', '      ');
    }

    // ====================================[\EVALUATE INPUT]==================================== //
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
function returnLastSpan() {
    const spans = cliSection.querySelectorAll('span');
    const lastSpan = spans[spans.length - 1];
    return lastSpan;
}
// Focuses the input provided as argument
function focusLastInput(input) {
    input.focus();
}

// CLI enter event listener
document.addEventListener('keypress', (e) => {
    // Enter
    if (e.key === 'Enter') {
        if (document.activeElement === returnLastInput()) CLI.removeInputEventListener();
        handleEnterKey();
    }
});

// Arrow up & Arrow down event listener
document.addEventListener('keydown', (e) => {
    const lastInput = returnLastInput();
    const span = returnLastSpan();
    const input = returnLastInput();
    // Arrow up
    if (e.key === 'ArrowUp') {
        history.arrowUp();
        history.displayHistoryInput(lastInput);
    }
    // Arrow down
    else if (e.key === 'ArrowDown') {
        history.arrowDown();
        history.displayHistoryInput(lastInput);
    }
    // Tab
    else if (e.key === 'Tab' && span.value !== '') {
        e.preventDefault();
        input.value = span.innerText;
        autocomplete.resetSpan();
    }
});

function handleEnterKey() {
    const lastInput = returnLastInput();
    if (lastInput.value !== '') {
        lastInput.disabled = true;
        history.pushInputToHistory(lastInput.value);
        history.resetHistoryTracker();
        CLI.evaluateInput(lastInput.value);
        CLI.createInput();
    }
}

// CLI section click event listener
cliSection.addEventListener('click', () => {
    const lastInput = returnLastInput();
    focusLastInput(lastInput);
});

// =====================================[\EVENT LISTENERS]===================================== //


export function getCLI() {
    return CLI;
}
