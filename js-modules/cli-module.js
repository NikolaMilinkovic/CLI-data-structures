/* eslint-disable no-alert */
import { getData } from './data.js';
import { getDisplay } from './display-module.js';
import { getHistory } from './history-tracker.js';
import { getThemes } from './themes.js';
import { getAutocomplete } from './autocomplete.js';
import {
    createDiv, createPara, createLink, appendChildren,
} from './element-builder.js';
import { stopAnimation, startAnimation } from './cmatrix.js';

const data = getData();
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
        this.displayHero();
        this.createInput();
    }

    // =====================================[HERO METHODS]===================================== //
    // Method for displaying the hero text
    displayHero() {
        const asciiText = data.getData('hero', 0, 0);
        const subText = data.getData('hero', 0, 1);

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

    // =====================================[\HERO METHODS]===================================== //


    // =====================================[CLI METHODS]===================================== //

    // Returns an array of elements for cli input display
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

    // Creates next input and appends it to the cli-section
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

    // Method for adding event listener to input, sends value upon input
    // Handles autocomplete span value, sends it for evaluation and printing of autocomplete
    // Handles reseting the span when user deletes the value in input
    // This method is written in such a way so that we can remove it later on with
    // removeInputEventListener
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

    // Method for removing input event listener from the last input in the cli section
    removeInputEventListener() {
        const lastInput = returnLastInput();
        lastInput.removeEventListener('input', this.inputListener);
    }
    // =====================================[\CLI METHODS]===================================== //


    // =====================================[CLI COMMANDS]===================================== //


    // Displays help text on the screen
    displayHelp() {
        const para = document.createElement('pre');
        para.classList.add('cli-text');
        para.classList.add('cli-mar-left-2rem');
        para.innerHTML = data.getData('help', 0);

        this.cli.appendChild(para);
    }

    // Displays algorith list on the screen
    displayAlgorithms() {
        const para = document.createElement('pre');
        para.classList.add('cli-text');
        para.classList.add('cli-mar-left-2rem');
        para.innerHTML = data.getData('algorithm-text', 0);

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

        switch (command) {
        // Help
        case 'help':
            this.displayHelp();
            break;

        // Run
        case 'run':
            this.run(parameter, para);
            break;

        // Algorithms
        case 'algorithms':
            this.displayAlgorithms();
            break;

        // Clear
        case 'clear':
            this.clearCLI();
            break;

        // Git
        case 'git':
            this.printGit('https://github.com/NikolaMilinkovic/CLI-Algorithms', 'NikolaMilinkovic/CLI-Algorithms', '         ');
            break;

        // Themes
        case 'themes':
            this.printThemes();
            break;

        // Theme [theme name]
        case 'theme':
            if (parameter !== undefined && parameter !== '') {
                this.setTheme(command, parameter, para);
            } else {
                this.printActiveTheme();
            }
            break;

        // Animation with parameter
        case 'animation':
            if (parameter !== undefined && parameter !== '') {
                this.animationStopStart(parameter, para);
            } else {
                this.printAnimation();
            }
            break;

        // Banner
        case 'banner':
            this.displayHero();
            break;

        // Reload the page
        case 'reload':
            location.reload();
            break;

        // Closes the browser window
        case 'exit':
            window.close();
            break;

        // Toggles browser fullscreen (f11)
        case 'fullscreen':
            this.toggleFullscreen();
            break;

        // Command not found
        default:
            this.commandNotFound(command, para);
            break;
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
        this.printLine('For random theme type: theme random', '', '   ');
    }

    // Method used by printThemes method in order to create and append paragraphs
    printThemeLine(input, className, indentation, parent) {
        const para = document.createElement('pre');
        para.innerHTML = `${indentation}${input}`;
        para.classList.add('cli-text');
        para.classList.add('display-margins');
        if (className !== '') para.classList.add(className);
        parent.appendChild(para);
    }

    // Prints currently active theme and informs user about other theme commands
    printActiveTheme() {
        const activeTheme = themes.getActiveThemeName();
        this.printLine(`Active theme: ${activeTheme}`, '', '   ');
        this.printLine('- For full list of themes type:  themes', '', '      ');
        this.printLine(' ', '', ' ');
        this.printLine('- To set a theme type:  theme [theme name]', '', '      ');
        this.printLine(' ', '', ' ');
        this.printLine('- For a random theme type:  theme random', '', '      ');
    }

    // Method for setting the theme
    setTheme(command, parameter, para) {
        const theme = themes.findTheme(parameter);
        if (parameter === 'random') themes.setRandomTheme();
        else if (theme) themes.setTheme(theme);
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
        const algorithmList = data.getData('algorithm-list', 0);
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

    // Calls for animation methods based on parameter
    animationStopStart(parameter, para) {
        if (parameter === 'start') this.animationStart();
        else if (parameter === 'stop') this.animationStop();
        else this.commandNotFound(`animation ${parameter}`, para);
    }

    // Stops background animation
    animationStart() {
        startAnimation();
    }

    // Starts / Continues background animation
    animationStop() {
        stopAnimation();
    }

    // Prints animation information
    printAnimation() {
        this.printLine('Using following commands you can pause / continue background animations', '', '   ');
        this.printLine('- animation stop', '', '      ');
        this.printLine('- animation start', '', '      ');
    }

    // Toggle fullscreen
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.printLine('To exit full screen press F11 or type:  fullscreen', '', '   ');
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    // ====================================[\EVALUATE INPUT]==================================== //
}


const CLI = new CLIComponent('cli-section');
export function getCLIComponent() {
    return CLI;
}
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
    const lastInputValue = lastInput.value.toLowerCase();

    if (lastInput.value !== '') {
        lastInput.disabled = true;
        history.pushInputToHistory(lastInputValue);
        history.resetHistoryTracker();
        autocomplete.resetSpan();
        CLI.evaluateInput(lastInputValue);
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
