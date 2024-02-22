export default class Data {
    constructor() {
        this.hero = [];
        this.help = [];
        this.algorithmList = [];
        this.algorithmText = [];
        this.BST_code = '';
        this.LL_code = '';
        this.BST_whatIs = '';
        this.LL_whatIs = '';
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

        case 'what-is-bst':
            text = this.getBST_whatIs();
            return text;

        case 'what-is-ll':
            text = this.getLL_whatIs();
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

    pushBST_whatIs(text) {
        this.BST_whatIs = text;
    }

    pushLL_whatIs(text) {
        this.LL_whatIs = text;
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

    getBST_whatIs() {
        return this.BST_whatIs;
    }

    getLL_whatIs() {
        return this.LL_whatIs;
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
    ' - help ____________________ Well you know this one.',
    ' - algorithms ______________ Display list of algorithms',
    ' - run [algorithm name] ____ Displays selected algorithm',
    ' - themes __________________ Show current theme & list of available themes',
    ' - theme [theme name] ______ Set new active theme',
    ' - random [theme/algorithm]_ Set new active theme',
    ' - animation _______________ Displays animation information',
    ' - fullscreen ______________ Self explanatory innit?',
    ' - clear ___________________ Clears the CLI',
    ' - git _____________________ Check out my GitHub profile! <3',
    ' - banner __________________ Clears the CLI and displays banner',
    ' - reload __________________ Reloads the page / f5',
    ' - exit ____________________ If browser allows will close the tab',
]);
// Algorighm list
data.pushAlgorithmList([
    'bst',
    'binary-search-tree',
    'linked-list',
    'll',
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

data.pushBST_whatIs(`A Balanced Binary Search Tree (BST) is a data structure that stores a sorted collection of elements. It keeps the tree balanced, ensuring that the height difference between left and right subtrees of any node is at most one. This balance allows for efficient operations like search, insert, and delete, all done in logarithmic time complexity, which is faster than unbalanced binary trees.
<br>
This structure is valuable because it maintains balance, ensuring efficient search, insert, and delete operations. It's ideal for scenarios requiring a sorted collection of elements, like databases, where quick data search and retrieval are critical. It's also used in implementing sets, maps, and optimizing algorithms such as sorting and searching.
<br>
In a BST, searching for a value is like finding a contact in an address book:

1) Start with the Index: Just as an address book begins with an index, a BST starts with a root node.<br>
2) Compare Values: To find a contact's number, you compare the name with index names. In a BST, you compare the value with the current node's value.<br>
3) Navigate Efficiently: If the name comes before the current name in the index, you go back; if it's after, you go forward. In a BST, you move to the left child for smaller values and to the right child for larger values.<br>
4) Repeat Until Found: You continue this process until you find the contact's number or reach the end of the address book (or tree).<br>
5) Efficient Search: The sorted order of an address book helps you quickly locate a contact. Similarly, a BST's structure allows for quick finding of a value without checking every node.<br>`);


data.pushLL_whatIs(`A Linked List is a linear data structure consisting of a sequence of elements, called nodes, where each node points to the next node in the sequence. Unlike arrays, which have a fixed size, linked lists can dynamically grow or shrink in size.

Linked lists are useful for implementing dynamic data structures and are particularly efficient for insertions and deletions at arbitrary positions, as they require only adjusting the pointers to neighboring nodes.

In a linked list, each node contains two components: data and a reference (or pointer) to the next node in the sequence. The first node is called the head, and the last node's next reference is typically null, indicating the end of the list.

Traversing a linked list involves starting at the head node and following the next pointers until reaching the end of the list. Searching for a specific value in a linked list requires traversing the list and comparing each node's value until the desired value is found or the end of the list is reached.

Adding a new node to the beginning of a linked list involves creating a new node, setting its next pointer to the current head node, and then updating the head to point to the new node. Adding a new node to the end of the list requires traversing the list to find the last node and updating its next pointer to point to the new node.

Removing a node from a linked list involves updating the next pointer of the node before the node to be removed to point to the node after the one being removed, effectively bypassing the node to be removed.

Linked lists are used in various applications, including implementing stacks, queues, and adjacency lists for graphs. They are also used in memory allocation and dynamic memory management.`);
