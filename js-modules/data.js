export default class Data {
    constructor() {
        this.hero = [];
        this.help = [];
        this.algorithmList = [];
        this.algorithmText = [];
        this.BST_code = '';
        this.LL_code = '';
    }

    // ===============================[DATA RETRIEVAL METHODS]=============================== //


    // Method used for returning the data
    getData(type, index = 0, subindex = 0) {
        let text = '';

        switch (type) {
        case 'hero':
            text = this.getHeroText(index, subindex);
            break;

        case 'help':
            text = this.getHelpText(index);
            break;

        case 'algorithm-list':
            text = this.getAlgorithmList(index);
            return text;

        case 'algorithm-text':
            text = this.getAlgorithmText(index);
            break;

        case 'bst-code':
            text = this.getBST_code();
            return text;

        case 'll-code':
            text = this.getLL_code();
            return text;

        default:
            text = 'Error, type not found';
        }

        return text.join('<br>');
    }

    // ===============================[\DATA RETRIEVAL METHODS]=============================== //


    // ===============================[PUSH METHODS]=============================== //
    // Method for pushing a hero text into the array
    pushHeroText(heroText, heroSubtext) {
        const heroData = [heroText, heroSubtext];
        this.hero.push(heroData);
    }

    // Pushes help text into the help array
    pushHelpText(text) {
        this.help.push(text);
    }

    // Pushes list of algorithms into algorithms array
    pushAlgorithmList(text) {
        this.algorithmList.push(text);
    }

    pushAlgorithmText(text) {
        this.algorithmText.push(text);
    }

    pushBST_code(text) {
        this.BST_code = text;
    }

    pushLL_code(text) {
        this.LL_code = text;
    }

    // ===============================[PUSH METHODS]=============================== //


    // ===============================[GET METHODS]=============================== //
    getHeroText(index, subindex) {
        return this.hero[index][subindex];
    }

    getHelpText(index) {
        return this.help[index];
    }

    getAlgorithmList(index) {
        return this.algorithmList[index];
    }

    getAlgorithmText(index) {
        return this.algorithmText[index];
    }

    getBST_code() {
        return this.BST_code;
    }

    getLL_code() {
        return this.LL_code;
    }

    // ===============================[\GET METHODS]=============================== //
    // Returns the list of available algorithms
}

const data = new Data();

export function getData() {
    return data;
}

data.pushHeroText(
    // Hero text
    [
        '   ██████╗██╗     ██╗       █████╗ ██╗      ██████╗  ██████╗ ██████╗ ██╗████████╗██╗  ██╗███╗   ███╗███████╗',
        '  ██╔════╝██║     ██║      ██╔══██╗██║     ██╔════╝ ██╔═══██╗██╔══██╗██║╚══██╔══╝██║  ██║████╗ ████║██╔════╝',
        '  ██║     ██║     ██║█████╗███████║██║     ██║  ███╗██║   ██║██████╔╝██║   ██║   ███████║██╔████╔██║███████╗',
        '  ██║     ██║     ██║╚════╝██╔══██║██║     ██║   ██║██║   ██║██╔══██╗██║   ██║   ██╔══██║██║╚██╔╝██║╚════██║',
        '  ╚██████╗███████╗██║      ██║  ██║███████╗╚██████╔╝╚██████╔╝██║  ██║██║   ██║   ██║  ██║██║ ╚═╝ ██║███████║',
        '   ╚═════╝╚══════╝╚═╝      ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝',
        ' ',
        ' ',
    ],
    // Hero subtext
    [
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
    ],
);
// Help commands
data.pushHelpText([
    'Available commands:',
    '   ',
    ' - help',
    ' - algorithms',
    ' - run [algorithm name]',
    ' - themes',
    ' - theme [theme name]',
    ' - animation',
    ' - fullscreen',
    ' - clear',
    ' - git',
    ' - banner',
    ' - reload',
    ' - exit',
]);
// Algorighm list
data.pushAlgorithmList([
    'bst',
    'binary-search-tree',
    'linked-list',
]);

data.pushAlgorithmText([
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
]);

data.pushBST_code(`// Tree class constructor
export default class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree(array);
        this.preOrderValues = [];
        this.inOrderValues = [];
        this.postOrderValues = [];
    }

    // Method for rebuilding the tree on new input array
    rebuildTree(array) {
        this.array = array;
        this.root = buildTree(array);
    }

    sortArray(arr) {
        if (!Array.isArray(arr)) return parseInt(arr);
        return arr.sort((a, b) => a - b);
    }

    removeDuplicatesInArr(arr) {
        if (!Array.isArray(arr)) return parseInt(arr);
        const newArray = [];
        arr.forEach((element) => {
            if (!newArray.includes(element)) newArray.push(element);
        });
        return newArray.map((value) => parseInt(value));
    }

    // Sorts an array and removes all the duplicates from it
    sortAndRemoveDuplicates(array) {
        return this.removeDuplicatesInArr(this.sortArray(array));
    }

    // Method for inserting new values into the Tree
    insert(value, root = this.root) {
        if (root === null) {
            return new Node(value);
        }

        if (value < root.value) {
            root.left = this.insert(value, root.left);
        } else if (value > root.value) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    // Method for removing values from the Tree
    remove(value, root = this.root, parent = null) {
        if (!root) {
            return false;
        }

        if (root.value === value) {
            // Removing leaf node
            if (root.left === null && root.right === null) {
                if (parent && parent.left === root) {
                    parent.setLeft(null);
                } else {
                    parent.setRight(null);
                }
                return true;
            }

            // Removing node with one child
            if (root.left !== null && root.right === null) {
                root.value = root.left.value;
                root.setRight(root.left.right);
                root.setLeft(null);
                return true;
            } else if (root.right !== null && root.left === null) {
                root.value = root.right.value;
                root.setLeft(root.right.left);
                root.setRight(null);
                return true;
            }

            // Removing node with two children
            const successor = this.getSmallest(root.right);
            this.remove(successor, root.right, root);
            root.value = successor;
            return true;
        }

        if (value < root.value) {
            return this.remove(value, root.left, root);
        }
        if (value > root.value) {
            return this.remove(value, root.right, root);
        }

        return false;
    }

    // Method for searching the value inside the BST
    // Returns the requested node
    find(value, root = this.root) {
        if (root === null || root === undefined) {
            return false;
        }
        if (root.value === value) {
            return root;
        }
        if (value < root.value) {
            return this.find(value, root.left);
        }
        if (value > root.value) {
            return this.find(value, root.right);
        }
    }

    // Method for finding the smallest value inside the given tree
    getSmallest(root = this.root) {
        const smallest = root.value;

        if (root.left !== null) {
            return this.getSmallest(root.left);
        }

        return smallest;
    }

    // Method that traverses the tree in breadth-first level order
    // Returns an array with all the values
    levelOrder(callback) {
        const queue = [this.root];
        const levelOrderValues = [];

        while (queue.length > 0) {
            const current = queue.shift();
            !callback ? levelOrderValues.push(current.value) : callback(current);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }

        return levelOrderValues.join(', ');
    }

    // Console logs each node value
    cLogValues(node) {
        console.log(node.value);
    }

    // Clear inOrderValues
    clearInOrder() {
        this.inOrderValues = [];
    }

    // Inorder traversal method
    inOrder(root = this.root) {
        if (root === null) return;

        this.inOrder(root.left);
        this.inOrderValues.push(root.value);
        this.inOrder(root.right);
    }

    // Clear preOrderValues
    clearPreOrder() {
        this.preOrderValues = [];
    }

    // Preorder traversal method
    preOrder(root = this.root) {
        if (root === null) return;

        this.preOrderValues.push(root.value);
        this.preOrder(root.left);
        this.preOrder(root.right);
    }

    // Clear postOrderValues
    clearPostOrder() {
        this.postOrderValues = [];
    }

    // Postorder traversal method
    postOrder(root = this.root, callback) {
        if (root === null) return;
        let queue = [];

        // Level order traverse root.left
        queue = [root.left];
        while (queue.length > 0) {
            const current = queue.shift();
            !callback ? this.postOrderValues.push(current.value) : callback(current);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }

        // Level order traverse root.right
        queue = [root.right];
        while (queue.length > 0) {
            const current = queue.shift();
            !callback ? this.postOrderValues.push(current.value) : callback(current);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }

        // Add root.value at the end
        this.postOrderValues.push(root.value);
    }

    // Returns the height of the BST
    height(root = this.root) {
        if (root === null) return -1;

        const left = this.height(root.left);
        const right = this.height(root.right);

        return Math.max(left, right) + 1;
    }

    // Returns the given node's depth in the BST
    depth(value, root = this.root, depth = 0) {
        if (root === null) return -1;
        if (root.value === value) return depth;

        // Checks left side of the tree for the value
        const left = this.depth(value, root.left, depth + 1);
        if (left !== -1) return left;

        // Checks right side of the tree for the value
        const right = this.depth(value, root.right, depth + 1);
        if (right !== -1) return right;

        return -1;
    }

    // Checks for BST balance and returns true / false
    isBalanced(root = this.root) {
        if (root === null) return true;

        const leftSubtree = this.height(root.left);
        const rightSubtree = this.height(root.right);

        return Math.abs(leftSubtree - rightSubtree) <= 1
        && this.isBalanced(root.left)
        && this.isBalanced(root.right);
    }

    // Method for that rebalances unbalanced tree
    rebalance() {
        const isBalanced = this.isBalanced();
        if (isBalanced) return;

        this.inOrder();
        const arr = this.sortArray(this.removeDuplicatesInArr(this.inOrderValues));
        this.root = buildTree(arr);
    }
}

// Node class constructor
class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    setLeft(left) {
        this.left = left;
    }

    setRight(right) {
        this.right = right;
    }
}

// Method for creating a BST
function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = parseInt(Math.floor((start + end) / 2));
    const root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
}

// Method for printing out the Tree
export const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, \`\${prefix}\${isLeft ? '│   ' : '    '}\`, false);
    }
    if (node.left !== null) {
        prettyPrint(node.left, \`\${prefix}\${isLeft ? '    ' : '│   '}\`, true);
    }
};

// =======================[TESTING]======================= //
const array = [10, 20, 30, 32, 34, 36, 40, 50, 60, 70, 80, 85];
const BST = new Tree(array);
prettyPrint(BST.root);

export function getBST() {
    return BST;
}
`);

data.pushLL_code(`class Node {
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
        const returnMessage = \`New data of \${data} added at index \${index}\`;
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
        const returnMessage = \`Removed node at index \${index}\`;

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
        let string = \`<br>[Head]=>(\${current.data})───>\`;

        while (current.nextNode !== null) {
            current = current.nextNode;
            i++;
            string += \`(\${current.data})───>\`;
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
            elementArr.push(createPara(\`(\${current.data})\`, classList, '', 'para'));
            elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
        } else {
            elementArr.push(createPara(\`<br>[Head]=>(\${current.data})───>\`, classList, '', 'para'));
        }


        // Traverses nodes, creates element with corresponding classes
        while (current.nextNode !== null) {
            current = current.nextNode;

            if (arr.indexOf(current.data) !== -1) {
                classList = ['linked-list-print', 'cli-text', 'll-red'];
                elementArr.push(createPara(\`(\${current.data})\`, classList, '', 'para'));
                elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
            } else {
                classList = ['linked-list-print', 'cli-text'];
                elementArr.push(createPara(\`(\${current.data})───>\`, classList, '', 'para'));
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
        let string = \`<br>[\${i}]=>[Data: \${current.data}]<br> 🠋\`;
        arr.push(string);

        while (current.nextNode !== null) {
            current = current.nextNode;
            i++;
            string = \`[\${i}]=>(Data: \${current.data})<br> 🠋\`;
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
`);
