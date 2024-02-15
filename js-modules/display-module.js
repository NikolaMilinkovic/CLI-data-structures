/* eslint-disable max-len */
import {
    createPara, createInput, createButton, appendChildren, createDiv, addListener,
} from './element-builder.js';
import { getBST } from './bst.js';

const BST = getBST();


export default class DisplaySection {
    constructor(elementId, upperSection, lowerSection) {
        this.element = document.getElementById(elementId);
        this.upperSection = document.getElementById(upperSection);
        this.lowerSection = document.getElementById(lowerSection);
        this.bstControlTracker = 0;
    }

    // Main method that handles displaying elements on the display section
    display(parameter) {
        // BST
        if (parameter === 'bst') {
            this.clearDisplaySection();
            this.displayHeader(parameter);
            this.prettyPrint(BST.root);
            this.getBSTControls();
        }
        // Linked List
        else if (parameter === 'linked-list') {
            this.clearDisplaySection();
            this.displayHeader(parameter);
        }
    }

    // Methods for creating BST controls
    getBSTControls() {
        const mainControlDiv = createDiv(['bst-main-control-div']);
        const newTree = this.BST_newTree();
        const insertValue = this.BST_insertValue();
        const removeValue = this.BST_removeValue();
        const isTreeBalanced = this.BST_isTreeBalanced();
        const showTraversals = this.getBST_toggleTraversalBtn();

        appendChildren(mainControlDiv, [newTree, insertValue, removeValue, isTreeBalanced, showTraversals]);
        this.lowerSection.appendChild(mainControlDiv);
    }

    getBSTTraversals() {
        const mainControlDiv = createDiv(['bst-main-control-div']);
        const levelOrderTraverse = this.BST_levelOrderTraverse();
        const preOrderTraverse = this.BST_preOrderTraverse();
        const inOrderTraverse = this.BST_inOrderTraverse();
        const postOrderTraverse = this.BST_postOrderTraverse();
        const showTraversals = this.getBST_toggleTraversalBtn();

        appendChildren(mainControlDiv, [levelOrderTraverse, preOrderTraverse, inOrderTraverse, postOrderTraverse, showTraversals]);
        this.lowerSection.appendChild(mainControlDiv);
    }

    BST_levelOrderTraverse() {
        const div = createDiv(['bst-control-div', 'bst-column-div'], '');
        const para = createPara('Level order traversal:', ['cli-text', 'control-label'], '');
        const values = createPara(BST.levelOrder(), ['cli-text', 'word-wrap-break', 'lower-border'], '');

        return appendChildren(div, [para, values]);
    }

    BST_preOrderTraverse() {
        BST.clearPreOrder();
        BST.preOrder();
        const div = createDiv(['bst-control-div', 'bst-column-div'], '');
        const para = createPara('Pre order traversal:', ['cli-text', 'control-label'], '');
        const values = createPara(BST.preOrderValues.join(', '), ['cli-text', 'word-wrap-break', 'lower-border'], '');

        return appendChildren(div, [para, values]);
    }

    BST_inOrderTraverse() {
        BST.clearInOrder();
        BST.inOrder();
        const div = createDiv(['bst-control-div', 'bst-column-div'], '');
        const para = createPara('In order traversal:', ['cli-text', 'control-label'], '');
        const values = createPara(BST.inOrderValues.join(', '), ['cli-text', 'word-wrap-break', 'lower-border'], '');

        return appendChildren(div, [para, values]);
    }

    BST_postOrderTraverse() {
        BST.clearPostOrder();
        BST.postOrder();
        const div = createDiv(['bst-control-div', 'bst-column-div'], '');
        const para = createPara('Post order traversal:', ['cli-text', 'control-label'], '');
        const values = createPara(BST.postOrderValues.join(', '), ['cli-text', 'word-wrap-break', 'lower-border'], '');

        return appendChildren(div, [para, values]);
    }

    BST_newTree() {
        const newTreeDiv = createDiv(['bst-control-div'], '');

        const newTreePara = createPara('Build new tree', ['cli-text', 'control-label'], '');
        const newTreeInput = createInput('10 20 30 40 etc.', ['bst-input'], 'input-new-tree');
        const newTreeBtn = createButton('Build tree', ['bst-btn'], 'btn-new-tree');

        return appendChildren(newTreeDiv, [newTreePara, newTreeInput, newTreeBtn]);
    }

    BST_insertValue() {
        const div = createDiv(['bst-control-div'], '');

        const para = createPara('Insert new value', ['cli-text', 'control-label'], '');
        const input = createInput('10 20 30 40 etc.', ['bst-input'], 'input-new-value');
        const button = createButton('Add new value', ['bst-btn'], 'btn-new-value');

        return appendChildren(div, [para, input, button]);
    }

    BST_isTreeBalanced() {
        const div = createDiv(['bst-control-div'], '');

        const para = createPara('Is tree balanced?', ['cli-text', 'control-label'], '');
        const input = createInput(BST.isBalanced(BST.root), ['bst-input', 'bst-input-balanced'], 'input-new-value');
        const button = createButton('Rebalance the tree', ['bst-btn'], 'btn-new-value');

        return appendChildren(div, [para, input, button]);
    }

    BST_removeValue() {
        const div = createDiv(['bst-control-div'], '');

        const para = createPara('Remove value', ['cli-text', 'control-label'], '');
        const input = createInput('10 20 30 40 etc.', ['bst-input'], 'remove-value');
        const button = createButton('Remove value', ['bst-btn'], 'btn-removew-value');

        return appendChildren(div, [para, input, button]);
    }

    // Traversal button toggle function
    toggleBSTControls() {
        if (this.bstControlTracker === 0) {
            this.bstControlTracker = 1;
            this.clearLowerSection();
            this.getBSTTraversals();
        } else {
            this.bstControlTracker = 0;
            this.clearLowerSection();
            this.getBSTControls();
        }
    }

    // Create and return BST Traversal toggle button
    getBST_toggleTraversalBtn() {
        const showTraversalsButton = createButton('Show traversals', ['bst-btn'], 'btn-show-traversal');
        this.addBSTToggleListener(showTraversalsButton); // Add event listener here
        return showTraversalsButton;
    }

    // Appends event listener to BST Traversal toggle button
    // This is done in this way in order to append the listener after the element
    // has been created and is available in dom. If not we get an error
    addBSTToggleListener(button) {
        button.addEventListener('click', this.toggleBSTControls.bind(this));
    }


    // Returns header text based on parameter
    getHeader(parameter) {
        if (parameter === 'bst') return 'Binary Search Tree';
        if (parameter === 'linked-list') return 'Linked List';
    }

    // Displays header on the DisplaySection
    displayHeader(parameter) {
        if (parameter === 'bst') {
            this.printLine(this.getHeader(parameter), 'align-center', this.upperSection);
        }
        if (parameter === 'linked-list') {
            this.printLine(this.getHeader(parameter), 'align-center', this.upperSection);
        }
    }

    // Method for creating and displaying a para element
    printLine(input, className, section) {
        const para = document.createElement('pre');
        para.innerHTML = input;
        para.classList.add('cli-text');
        para.classList.add('display-margins');
        if (className !== '') para.classList.add(className);
        if (section === this.upperSection) this.upperSection.appendChild(para);
        if (section === this.lowerSection) this.upperSection.appendChild(para);
    }

    // Method for clearing the display section
    clearDisplaySection() {
        while (this.upperSection.firstChild) {
            this.upperSection.removeChild(this.upperSection.firstChild);
        }
        while (this.lowerSection.firstChild) {
            this.lowerSection.removeChild(this.lowerSection.firstChild);
        }
    }

    // Method for clearing upper section
    clearUpperSection() {
        while (this.upperSection.firstChild) {
            this.upperSection.removeChild(this.upperSection.firstChild);
        }
    }

    // Method for clearing lower section
    clearLowerSection() {
        while (this.lowerSection.firstChild) {
            this.lowerSection.removeChild(this.lowerSection.firstChild);
        }
    }

    // Method used for printing Tree structures
    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        this.printLine(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`, '', this.upperSection);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
}


const display = new DisplaySection('display-section', 'upper-section', 'lower-section');

export function getDisplay() {
    return display;
}


