/* eslint-disable max-classes-per-file */
import {
    createPara, createInput, createButton, appendChildren, createDiv, addListener, addThisListener,
} from './element-builder.js';

class Node {
    constructor(data = null, nextNode = null) {
        this.data = data;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert new element as the head
    insertListHead(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    // Removes list head and points to a new one
    removeListHead() {
        this.head = this.head.nextNode;
        this.size--;
    }

    // Sets new node as head with null pointer
    newListHead(data) {
        this.head = new Node(data);
    }

    // Prints out all the data from linked list
    getListData() {
        const arr = [];
        let current = this.head;
        arr.push(current.data);

        while (current) {
            arr.push(current.data);
            current = current.nextNode;
        }

        return arr;
    }

    // Appends new node to the end of the linked list
    appendNewNode(data) {
        // If there are no nodes in the linked list
        if (!this.head) {
            this.head = new Node(data);
            this.size++;
            return this;
        }
        // If we have nodes in the linked list

        let current = this.head;

        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        current.nextNode = new Node(data);
        this.size++;
    }

    // Get the size of the linked list
    getListSize() {
        return this.size;
    }

    // Get linked list head
    getListHead() {
        return this.head;
    }

    // Returns the tail of the list / last node of the list
    getListTail() {
        if (!this.head) {
            return 'This linked list has no nodes!';
        }
        let current = this.head;

        while (current.nextNode !== null) {
            current = current.nextNode;
        }

        return current;
    }

    // Returns node at the given index
    atIndex(index) {
        // If linked list has no nodes
        if (!this.head) {
            return 'This linked list has no nodes!';
        }

        // Traverse nodes until index

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.nextNode;
            if (current === null) {
                return null;
            }
        }
        if (current !== null) {
            return current;
        }
    }

    // Inserts new value at given index
    insertAtIndex(data, index) {
        const returnMessage = `New data of ${data} added at index ${index}`;
        // If linked list has no nodes
        if (!this.head) return 'This linked list has no nodes!';
        if (index < 0 || index > this.size) return 'Index out of bounds!';

        // If we are adding a new head
        if (index === 0) {
            this.insertListHead(data);
            return returnMessage;
        }
        // If we are adding a new tail
        if (index === this.size) {
            this.appendNewNode(data);
            return returnMessage;
        }

        let current = this.head;
        let previous;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.nextNode;
        }

        // Add new node and set new node.nextNode to the current node
        previous.nextNode = new Node(data, current);

        this.size++;
        return returnMessage;
    }

    // Removes node at given index
    removeAtIndex(index) {
        const returnMessage = `Removed node at index ${index}`;

        // If linked list has no nodes
        if (!this.head) return 'This linked list has no nodes!';
        if (index < 0 || index > this.size) return 'Index out of bounds!';

        // If we are removing the list head
        if (index === 0) {
            this.removeListHead();
            return returnMessage;
        }
        // If we are removing the last element
        if (index === this.size) {
            this.pop();
            this.size--;
            return returnMessage;
        }

        let current = this.head;
        let previous;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.nextNode;
        }

        previous.nextNode = current.nextNode;
        this.size--;

        return returnMessage;
    }

    // Method for removing every instance of provided value from linked list
    // calls recursively removeValueRecursive method
    removeValue(value) {
        this.head = this.removeValueRecursive(this.head, value);
    }

    // Called by removeValue, this method removes each instance of value from the linked list
    removeValueRecursive(node, value) {
        // Base case: if node is null, return null
        if (!node) {
            return null;
        }

        // If current node's data is the value, move to the next node
        if (node.data === value) {
            return this.removeValueRecursive(node.nextNode, value);
        }

        // Keep the current node and move to the next node
        node.nextNode = this.removeValueRecursive(node.nextNode, value);

        return node;
    }

    // Removes last node from the list
    pop() {
        const returnMessage = 'Removed last node from the list';
        if (!this.head) {
            return 'This linked list has no nodes!';
        }

        // If there is only one node
        if (!this.head.nextNode) {
            this.head = null;
            this.size--;
            return returnMessage;
        }

        let current = this.head;
        let previous;

        while (current.nextNode !== null) {
            previous = current;
            current = current.nextNode;
        }

        previous.nextNode = null;
        this.size--;
        return returnMessage;
    }

    // Checks if the value is in the list
    // If value found return true else false
    contains(value) {
        let current = this.head;
        if (current.data === value) {
            return true;
        }

        while (current.nextNode !== null) {
            current = current.nextNode;

            if (current.data === value) {
                return true;
            }
        }

        return false;
    }

    // Returns the index of the value if found in the linked list
    find(value) {
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            if (current.data === value) {
                return i;
            }
            current = current.nextNode;
        }

        return false;
    }

    // Visual print of linked list
    toString() {
        if (!this.head) {
            return 'Tree has no values! Try inserting some?';
        }
        let current = this.head;
        let i = 0;
        let string = `<br>[Head]=>(${current.data})───>`;

        while (current.nextNode !== null) {
            current = current.nextNode;
            i++;
            string += `(${current.data})───>`;
        }

        string += '[end]';
        return string;
    }

    // Method for printing the linked list with highlighted values
    toStringRed(array) {
        let arr = array;
        if (!this.head) {
            return false;
        }
        if (!Array.isArray(array)) {
            arr = [array];
        }

        let current = this.head;
        const elementArr = [];

        let classList = ['linked-list-print', 'cli-text'];
        const parent = createDiv(['linked-list-display-div', 'cli-text', 'linked-list-print'], '');

        // Handle the head element, matches the value inside array
        // Prints head value in red color, else print normal > pushes to element Arr
        if (arr.indexOf(current.data) !== -1) {
            classList = ['linked-list-print', 'cli-text', 'll-red'];
            elementArr.push(createPara('<br>[Head]=>', ['linked-list-print', 'cli-text'], '', 'para'));
            elementArr.push(createPara(`(${current.data})`, classList, '', 'para'));
            elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
        } else {
            elementArr.push(createPara(`<br>[Head]=>(${current.data})───>`, classList, '', 'para'));
        }


        // Traverses nodes, creates element with corresponding classes
        while (current.nextNode !== null) {
            current = current.nextNode;

            if (arr.indexOf(current.data) !== -1) {
                classList = ['linked-list-print', 'cli-text', 'll-red'];
                elementArr.push(createPara(`(${current.data})`, classList, '', 'para'));
                elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
            } else {
                classList = ['linked-list-print', 'cli-text'];
                elementArr.push(createPara(`(${current.data})───>`, classList, '', 'para'));
            }
        }

        elementArr.push(createPara('[end]', ['linked-list-print', 'cli-text'], '', 'para'));
        appendChildren(parent, elementArr);

        return parent;
    }

    // Visual print of linked list
    toString2() {
        if (!this.head) {
            return false;
        }
        let i = 0;
        let current = this.head;
        const arr = [];
        let string = `<br>[${i}]=>[Data: ${current.data}]<br> 🠋`;
        arr.push(string);

        while (current.nextNode !== null) {
            current = current.nextNode;
            i++;
            string = `[${i}]=>(Data: ${current.data})<br> 🠋`;
            arr.push(string);
        }

        string = '[end]';
        arr.push(string);
        return arr;
    }

    // Create new list
    createNewList(array) {
        this.newListHead(array.shift());

        array.forEach((value) => {
            this.appendNewNode(value);
        });
    }
}

const ll = new LinkedList();

export function getLinkedList() {
    return ll;
}
