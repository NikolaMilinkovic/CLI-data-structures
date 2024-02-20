/* eslint-disable no-alert */
/* eslint-disable max-len */
import {
    createPara, createInput, createButton, appendChildren, createDiv, createImg,
} from './element-builder.js';
import { getBST } from './bst.js';
import { getLinkedList } from './linked-list.js';

import {
    inputRegexValidator, buildArray, isBalancedTreeText, clearDiv,
} from './helper-functions.js';
import { getData } from './data.js';

const data = getData();
const BST = getBST();
const ll = getLinkedList();


export default class DisplaySection {
    constructor(elementId, upperSection, lowerSection) {
        this.element = document.getElementById(elementId);
        this.upperSection = document.getElementById(upperSection);
        this.lowerSection = document.getElementById(lowerSection);
        this.bstControlTracker = 0;

        this.CNTRL_buttonCollapseLogic = this.CNTRL_buttonCollapseLogic.bind(this);

        this.BST_newTreeLogic = this.BST_newTreeLogic.bind(this);
        this.BST_insertValueLogic = this.BST_insertValueLogic.bind(this);
        this.BST_removeValueLogic = this.BST_removeValueLogic.bind(this);
        this.BST_rebalanceTree = this.BST_rebalanceTree.bind(this);
        this.BST_showCodeLogic = this.BST_showCodeLogic.bind(this);
        this.BST_showBSTLogic = this.BST_showBSTLogic.bind(this);

        this.LL_newLinkListLogic = this.LL_newLinkListLogic.bind(this);
        this.LL_removeHeadLogic = this.LL_removeHeadLogic.bind(this);
        this.LL_removeValueIndexLogic = this.LL_removeValueIndexLogic.bind(this);
        this.LL_removeTailLogic = this.LL_removeTailLogic.bind(this);
        this.LL_showCodeLogic = this.LL_showCodeLogic.bind(this);
        this.LL_showLinkedListLogic = this.LL_showLinkedListLogic.bind(this);
    }


    // Main method that handles displaying elements on the display section
    display(parameter) {
        // BST
        if (parameter === 'bst' || parameter === 'binary-search-tree') {
            this.clearDisplaySection();
            this.displayHeader(parameter);
            this.prettyPrint(BST.root);
            this.getBSTControls();
        }
        // Linked List
        else if (parameter === 'linked-list') {
            this.clearDisplaySection();
            this.displayHeader(parameter);
            this.getLinkedListControls();
            this.printLinkedList();
        }
    }


    // ==========================[\CONTROLS DISPLAY LOGIC]=========================== //
    // Methods for creating BST controls
    getBSTControls() {
        const btnCollapse = this.CNTRL_buttonCollapse();
        const mainControlDiv = createDiv(['bst-main-control-div', 'bst-cntrl'], 'bst-main-control-div');
        const newTree = this.BST_newTree();
        const insertValue = this.BST_insertValue();
        const removeValue = this.BST_removeValue();
        const isTreeBalanced = this.BST_isTreeBalanced();
        const showTraversals = this.getBST_toggleTraversalBtn();

        appendChildren(mainControlDiv, [btnCollapse, newTree, insertValue, removeValue, isTreeBalanced, showTraversals]);
        this.lowerSection.appendChild(mainControlDiv);
        this.BST_displayTreeBalance();
    }

    getBSTTraversals() {
        const btnCollapse = this.CNTRL_buttonCollapse();
        const mainControlDiv = createDiv(['bst-main-control-div', 'bst-traversal'], 'bst-main-control-div');
        const levelOrderTraverse = this.BST_levelOrderTraverse();
        const preOrderTraverse = this.BST_preOrderTraverse();
        const inOrderTraverse = this.BST_inOrderTraverse();
        const postOrderTraverse = this.BST_postOrderTraverse();
        const showTraversals = this.getBST_toggleTraversalBtn();

        appendChildren(mainControlDiv, [btnCollapse, levelOrderTraverse, preOrderTraverse, inOrderTraverse, postOrderTraverse, showTraversals]);
        this.lowerSection.appendChild(mainControlDiv);
    }

    // Methods for creating Linked List controls
    getLinkedListControls() {
        const btnCollapse = this.CNTRL_buttonCollapse();
        const mainControlDiv = createDiv(['linked-list-main-control-div'], 'linked-list-main-control-div');
        const newList = this.LL_newLinkList();
        const insert = this.LL_insertLinkList();
        const remove = this.LL_removeLinkList();
        const find = this.LL_findLinkList();

        appendChildren(mainControlDiv, [btnCollapse, newList, insert, remove, find]);
        this.lowerSection.appendChild(mainControlDiv);
    }
    // ==========================[\CONTROLS DISPLAY LOGIC]=========================== //


    // ==========================[COLLAPSE EXPAND TOGGLE LOGIC]=========================== //
    CNTRL_buttonCollapse() {
        const button = createButton('', [], 'btn-collapse');
        const img = createImg('./img/minimize-black.png', [], 'cntrl-minimize-icon', false);
        button.appendChild(img);

        button.addEventListener('click', this.CNTRL_buttonCollapseLogic);

        return button;
    }

    CNTRL_buttonCollapseLogic() {
        // Returns div id
        const parentDivId = this.CNTRL_getFirstElId('lower-section');
        // Cache parent div
        const parentDiv = document.getElementById(parentDivId);
        // Get button id from provided parent id
        const btnId = this.CNTRL_getFirstElId(parentDivId);

        // Compare values
        const ll_divId = 'linked-list-main-control-div';
        const BST_divId = 'bst-main-control-div';

        // Case LL
        if (parentDivId === ll_divId) {
            // Run method based on present button id
            if (btnId === 'btn-collapse') {
                this.CNTRL_collapseLL(parentDiv);
            } else {
                this.CNTRL_expandLL(parentDiv);
            }
        }
        // Case BST
        else if (parentDivId === BST_divId) {
            // Run method based on present button id
            if (btnId === 'btn-collapse') {
                this.CNTRL_collapseBST(parentDiv);
            } else {
                this.CNTRL_expandBST(parentDiv);
            }
        } else if (parentDivId === 'traversals-div') {
            alert('we good');
        }
    }

    CNTRL_getFirstElId(id) {
        return document.getElementById(`${id}`).firstElementChild?.id;
    }

    CNTRL_collapseBST(div) {
        clearDiv(div);
        this.CNTRL_toggleDisplayGridRows('1fr 0.2fr');
        const button = this.CNTRL_buttonExpand();
        div.appendChild(button);
    }

    CNTRL_collapseLL(div) {
        clearDiv(div);
        this.CNTRL_toggleDisplayGridRows('1fr 0.2fr');
        const button = this.CNTRL_buttonExpand();
        div.appendChild(button);
    }

    CNTRL_buttonExpand() {
        const button = createButton('', [], 'btn-expand');
        const img = createImg('./img/expand-black.png', [], 'cntrl-expand-icon', false);
        button.appendChild(img);

        button.addEventListener('click', this.CNTRL_buttonCollapseLogic);
        console.log('button expand called');

        return button;
    }

    CNTRL_expandBST(parentDiv) {
        this.CNTRL_toggleDisplayGridRows('1fr 0.6fr');
        if (parentDiv.classList.contains('bst-cntrl')) {
            this.clearLowerSection();
            this.getBSTControls();
        } else {
            this.clearLowerSection();
            this.getBSTTraversals();
        }
    }

    CNTRL_expandLL() {
        this.CNTRL_toggleDisplayGridRows('1fr 0.6fr');
        this.clearLowerSection();
        this.getLinkedListControls();
    }

    CNTRL_toggleDisplayGridRows(fr) {
        document.documentElement.style.setProperty('--grid-template-rows', `${fr}`);
    }
    // ==========================[\COLLAPSE EXPAND TOGGLE LOGIC]=========================== //


    // ==========================[LINKED LIST MANIPULATION METHODS]=========================== //
    LL_newLinkList() {
        const div = createDiv(['linked-list-control-div'], '');

        // const label = createPara('Create new linked list:', ['cli-text', 'control-label'], '');
        const input = createInput('10 20 30 40 etc.', ['bst-input'], 'input-new-linked-list');
        input.autocomplete = 'off';
        const button = createButton('Create new linked list', ['bst-btn'], 'btn-new-linked-list');

        button.addEventListener('click', this.LL_newLinkListLogic);

        return appendChildren(div, [input, button]);
    }

    LL_newLinkListLogic() {
        const input = document.getElementById('input-new-linked-list');
        const array = buildArray(input);

        let i = 1;
        const intervalId = setInterval(() => {
            if (i <= array.length) {
                ll.createNewList(array.slice(0, i));
                this.printLinkedList();
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 300);
    }

    LL_insertLinkList() {
        const div = createDiv(['linked-list-control-div', 'grid-1-2-1'], '');
        const inputControlDiv = createDiv(['linked-list-insert-control-div'], '');
        const btnInsertHead = createButton('Insert head', ['insert-ll-btn-2', 'btn-width-160'], 'btn-insert-head-linked-list');
        const btnInsert = createButton('Insert', ['insert-ll-btn-2'], 'btn-insert-linked-list');

        const inputValue = createInput('value', ['bst-input', 'll-insert-input'], 'input-insert-value-linked-list');
        inputValue.autocomplete = 'off';

        const inputIndex = createInput('at index', ['bst-input', 'll-insert-input'], 'input-insert-index-linked-list');
        inputIndex.autocomplete = 'off';

        const btnInsertTail = createButton('Insert tail', ['insert-ll-btn-2', 'btn-margin-left', 'btn-width-160'], 'btn-insert-tail-linked-list');

        appendChildren(div, [btnInsertHead, appendChildren(inputControlDiv, [btnInsert, inputValue, inputIndex]), btnInsertTail]);

        return div;
    }

    LL_removeLinkList() {
        const div = createDiv(['linked-list-control-div', 'grid-1-2-1'], '');
        const btnRemoveHead = createButton('Remove head', ['remove-ll-btn', 'btn-width-160'], 'btn-remove-head-linked-list');

        const removeControlDiv = createDiv(['linked-list-remove-control-div'], '');
        const btnRemove = createButton('Remove', ['remove-ll-btn-2'], 'btn-new-linked-list');

        const inputValue = createInput('value', ['bst-input', 'll-remove-input'], 'input-remove-value-linked-list');
        inputValue.autocomplete = 'off';

        const inputIndex = createInput('at index', ['bst-input', 'll-remove-input'], 'input-remove-index-linked-list');
        inputIndex.autocomplete = 'off';

        const btnRemoveTail = createButton('Remove tail', ['remove-ll-btn', 'btn-margin-left', 'btn-width-160'], 'btn-remove-tail-linked-list');


        btnRemoveHead.addEventListener('click', this.LL_removeHeadLogic);
        btnRemove.addEventListener('click', this.LL_removeValueIndexLogic);
        btnRemoveTail.addEventListener('click', this.LL_removeTailLogic);

        return appendChildren(div, [btnRemoveHead, appendChildren(removeControlDiv, [btnRemove, inputValue, inputIndex]), btnRemoveTail]);
    }

    LL_findLinkList() {
        const controlsDiv = createDiv(['linked-list-remove-control-div', 'grid-1-1'], '');
        const findControlDiv = createDiv(['linked-list-remove-control-div'], '');
        const toggleCodeDisplay = createDiv(['linked-list-remove-control-div'], '');


        const btnFind = createButton('Find', ['remove-ll-btn', 'btn-width-160'], 'btn-find-tail-linked-list');

        const inputValue = createInput('value', ['bst-input', 'll-remove-input'], 'input-remove-index-linked-list');
        inputValue.autocomplete = 'off';
        const inputIndex = createInput('at index', ['bst-input', 'll-remove-input'], 'input-remove-index-linked-list');
        inputIndex.autocomplete = 'off';

        const showCode = createButton('Show code', ['remove-ll-btn', 'btn-margin-left', 'margin-left-auto', 'flex-and-centers', 'flex-grow-2rem'], 'btn-remove-tail-linked-list');
        showCode.addEventListener('click', this.LL_showCodeLogic);

        const showLinkedList = createButton('Show Linked List', ['remove-ll-btn', 'btn-margin-left', 'margin-left-auto', 'btn-width-160', 'margin-left-auto', 'flex-and-centers'], 'btn-remove-tail-linked-list');
        showLinkedList.addEventListener('click', this.LL_showLinkedListLogic);

        appendChildren(toggleCodeDisplay, [showCode, showLinkedList]);
        controlsDiv.appendChild(appendChildren(findControlDiv, [btnFind, inputValue, inputIndex]));

        return appendChildren(controlsDiv, [appendChildren(findControlDiv, [btnFind, inputValue, inputIndex]), toggleCodeDisplay]);
    }

    LL_showCodeLogic() {
        this.clearUpperSection();
        this.displayHeader('ll-code');
        this.printCode(data.getData('ll-code'), 'language-javascript', this.upperSection);
        Prism.highlightAll();
    }

    LL_showLinkedListLogic() {
        this.printLinkedList();
    }

    LL_removeValueIndexLogic() {
        console.log('btn Remove clicked');
        const inputIndex = document.getElementById('input-remove-index-linked-list');
        const inputValue = document.getElementById('input-remove-value-linked-list');
        if (!inputIndex.value && !inputValue.value) return;
        if (inputIndex.value && inputValue.value) {
            console.log('obe vrednosti');
            return;
        }
        if (inputIndex.value) {
            this.upperSection.appendChild(ll.toStringRed(buildArray(inputValue)));
        }
        if (inputValue.value) {
            const arr = buildArray(inputValue);
            this.removePrintAnimated(arr);
            this.clearInput(inputValue);
        }
    }

    LL_removeHeadLogic() {
        ll.removeListHead();
        this.printLinkedList(ll.getListData());
    }

    LL_removeTailLogic() {
        ll.pop();
        this.printLinkedList(ll.getListData());
    }


    // ==========================[\LINKED LIST MANIPULATION METHODS]========================== //


    // ===============================[BST TRAVERSAL METHODS]=============================== //


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
    // ===============================[\BST TRAVERSAL METHODS]=============================== //


    // ===============================[BST MANIPULATION METHODS]=============================== //
    BST_newTree() {
        const newTreeDiv = createDiv(['bst-control-div'], '');

        const newTreePara = createPara('Build new tree', ['cli-text', 'control-label'], '');
        const newTreeInput = createInput('10 20 30 40 etc.', ['bst-input'], 'input-new-tree');
        const newTreeBtn = createButton('Build tree', ['bst-btn'], 'btn-new-tree');

        newTreeBtn.addEventListener('click', this.BST_newTreeLogic);

        return appendChildren(newTreeDiv, [newTreePara, newTreeInput, newTreeBtn]);
    }

    BST_newTreeLogic() {
        const input = document.getElementById('input-new-tree');

        // Validates user input
        if (inputRegexValidator(input) === false) return;

        const array = BST.sortAndRemoveDuplicates(buildArray(input));

        this.BST_displayTreeBalance();
        BST.rebuildTree(array);
        this.printBST();
    }

    BST_insertValue() {
        const div = createDiv(['bst-control-div'], '');

        const para = createPara('Insert new value', ['cli-text', 'control-label'], '');
        const input = createInput('10 20 30 40 etc.', ['bst-input'], 'input-new-value');
        const button = createButton('Add new value', ['bst-btn'], 'btn-new-value');

        button.addEventListener('click', this.BST_insertValueLogic);

        return appendChildren(div, [para, input, button]);
    }

    BST_insertValueLogic() {
        const input = document.getElementById('input-new-value');

        // Validates user input
        if (inputRegexValidator(input) === false) return;

        const array = BST.sortAndRemoveDuplicates(buildArray(input));

        // Evaluate data type and run BST method accordingly
        if (Array.isArray(array)) {
            while (array.length !== 0) {
                BST.insert(array[0]);
                array.shift();
            }
        } else BST.insert(array);

        this.BST_displayTreeBalance();
        this.printBST();
    }

    BST_removeValue() {
        const div = createDiv(['bst-control-div'], '');

        const para = createPara('Remove value', ['cli-text', 'control-label'], '');
        const input = createInput('10 20 30 40 etc.', ['bst-input'], 'remove-value');
        const button = createButton('Remove value', ['bst-btn'], 'btn-remove-value');

        button.addEventListener('click', this.BST_removeValueLogic);

        return appendChildren(div, [para, input, button]);
    }

    BST_removeValueLogic() {
        const input = document.getElementById('remove-value');

        // Validates user input
        if (inputRegexValidator(input) === false) return;

        const array = BST.sortAndRemoveDuplicates(buildArray(input));

        // Evaluate data type and run BST method accordingly
        if (Array.isArray(array)) {
            while (array.length !== 0) {
                BST.remove(array[0]);
                array.shift();
            }
        } else BST.remove(array);

        this.BST_displayTreeBalance();
        this.printBST();
    }

    BST_isTreeBalanced() {
        const div = createDiv(['bst-control-div'], '');

        const para = createPara('Is tree balanced?', ['cli-text', 'control-label'], '');
        const input = createInput(isBalancedTreeText(BST.isBalanced(BST.root)), ['bst-input', 'bst-input-balanced'], 'input-balanced');
        input.disabled = true;
        const button = createButton('Rebalance the tree', ['bst-btn'], 'btn-balanced');

        button.addEventListener('click', this.BST_rebalanceTree);

        return appendChildren(div, [para, input, button]);
    }

    BST_displayTreeBalance() {
        const input = document.getElementById('input-balanced');
        input.placeholder = isBalancedTreeText(BST.isBalanced(BST.root));

        if (input.placeholder === 'The tree is balanced.') {
            input.classList.add('input-balanced-color');
            input.classList.remove('input-unbalanced-color');
        } else {
            input.classList.remove('input-balanced-color');
            input.classList.add('input-unbalanced-color');
        }
    }

    BST_rebalanceTree() {
        BST.rebalance();
        this.BST_displayTreeBalance();
        this.printBST();
    }

    // ===============================[\BST MANIPULATION METHODS]=============================== //


    // Method for printing BST
    printBST() {
        this.clearUpperSection();
        this.displayHeader('bst');
        this.prettyPrint(BST.root);
    }

    // Slow print method
    slowPrint(array) {
        let i = 1;
        const intervalId = setInterval(() => {
            if (i < array.length) {
                ll.createNewList(array.slice(0, i));
                this.printLinkedList();
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 400);
    }

    //
    removePrintAnimated(arr) {
        console.log('remove print animated started');
        let count = 0;
        const intervalId = setInterval(() => {
            if (count % 2 !== 0) {
                console.log('printing normal');
                this.printLinkedList();
            } else {
                console.log('printin red');
                this.printLinkedListRed(arr);
            }
            count++;
            if (count >= 7) {
                clearInterval(intervalId);
                if (!Array.isArray(arr)) ll.removeValue(arr);
                else {
                    arr.forEach((value) => {
                        ll.removeValue(value);
                    });
                }
                this.clearUpperSection();
                this.displayHeader('linked-list');
                this.printLinkedList();
            }
        }, 400);
    }

    // Print linked list normal
    printLinkedList() {
        this.clearUpperSection();
        this.displayHeader('linked-list');
        this.printLine(ll.toString(), 'linked-list-print', this.upperSection);
    }

    // Print linked list red / toStringRed
    printLinkedListRed(arr) {
        this.clearUpperSection();
        this.displayHeader('linked-list');
        this.upperSection.appendChild(ll.toStringRed(arr));
    }

    // Print linked list Variation=2
    printLinkedList2() {
        this.clearUpperSection();
        this.displayHeader('linked-list');
        const arr = ll.toString2();
        arr.forEach((string) => {
            this.printLine(string, 'linked-list-print', this.upperSection);
        });
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
        const div = createDiv(['linked-list-control-div', 'grid-1-1-1', 'gap-2rem'], 'traversals-div');
        const showTraversalsButton = createButton('Show traversals', ['bst-btn'], 'btn-show-traversal');
        this.addBSTToggleListener(showTraversalsButton);

        const showCode = createButton('Show code', ['remove-ll-btn', 'flex-and-centers', 'flex-grow'], 'btn-remove-tail-linked-list');
        showCode.addEventListener('click', this.BST_showCodeLogic);

        const showLinkedList = createButton('Show Binary Search Tree', ['remove-ll-btn', 'flex-and-centers', 'flex-grow'], 'btn-remove-tail-linked-list');
        showLinkedList.addEventListener('click', this.BST_showBSTLogic);


        appendChildren(div, [showTraversalsButton, showCode, showLinkedList]);
        return div;
    }

    BST_showCodeLogic() {
        this.clearUpperSection();
        this.displayHeader('bst-code');
        this.printCode(data.getData('bst-code'), 'language-javascript', this.upperSection);
        Prism.highlightAll();
    }

    BST_showBSTLogic() {
        this.printBST();
    }

    // Appends event listener to BST Traversal toggle button
    // This is done in this way in order to append the listener after the element
    // has been created and is available in dom. If not we get an error
    addBSTToggleListener(button) {
        button.addEventListener('click', this.toggleBSTControls.bind(this));
    }


    // Returns header text based on parameter
    getHeader(parameter) {
        if (parameter === 'bst' || parameter === 'binary-search-tree' || parameter === 'BST') return 'Binary Search Tree';
        if (parameter === 'linked-list') return 'Linked List';
        if (parameter === 'bst-code') return 'Binary Search Tree Javascript code';
        if (parameter === 'll-code') return 'Linked List Javascript code';
    }

    // Displays header on the DisplaySection
    displayHeader(parameter) {
        if (parameter === 'bst' || parameter === 'binary-search-tree' || parameter === 'BST') {
            this.printLine(this.getHeader(parameter), 'align-center', this.upperSection);
        }
        if (parameter === 'linked-list') {
            this.printLine(this.getHeader(parameter), 'align-center', this.upperSection);
        }
        if (parameter === 'bst-code') {
            this.printLine(this.getHeader('bst-code'), 'align-center', this.upperSection);
        }
        if (parameter === 'll-code') {
            this.printLine(this.getHeader('ll-code'), 'align-center', this.upperSection);
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

    // Method for printing code using Prismjs
    printCode(input, className, section) {
        const code = document.createElement('code');
        const para = document.createElement('pre');
        code.innerHTML = input;
        para.classList.add('cli-text');
        para.classList.add('display-margins');
        para.classList.add('language-css');
        if (className !== '') code.classList.add(className);
        para.appendChild(code);
        if (section === this.upperSection) this.upperSection.appendChild(para);
        if (section === this.lowerSection) this.lowerSection.appendChild(para);
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

    // Clear input
    clearInput(input) {
        input.value = '';
    }
}


const display = new DisplaySection('display-section', 'upper-section', 'lower-section');
ll.createNewList(['Pikachu', 'Charizard', 'Eevee', 'MewTwo', 'Bulbasaur', 'Snorlax', 'Jigglypuf', 'Meowth']);

export function getDisplay() {
    return display;
}


