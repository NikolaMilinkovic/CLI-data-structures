/* eslint-disable brace-style */
/* eslint-disable radix */
/* eslint-disable default-param-last */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
// Tree class constructor
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
        return arr.sort((a, b) => a - b);
    }

    removeDuplicatesInArr(arr) {
        const newArray = [];
        arr.forEach((element) => {
            if (!newArray.includes(element)) newArray.push(element);
        });
        return newArray;
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
        if (root === null || root === undefined) {
            return false;
        }

        if (root.value === value) {
            // Removing leaf node
            if (root.left === null && root.right === null) {
                if (parent.left === root) {
                    parent.setLeft(null);
                } else {
                    parent.setRight(null);
                }
            }

            // Removing node with one child
            else if (root.left !== null && root.right === null) {
                root.value = root.left.value;
                root.setRight(root.left.right);
                root.setLeft(null);
            } else if (root.right !== null && root.left === null) {
                root.value = root.right.value;
                root.setLeft(root.right.left);
                root.setRight(null);
            }

            // Removing node with two children
            else {
                const successor = this.getSmallest(root.right);
                root.value = successor;
                this.remove(successor, root.right, root);
            }
            return true;
        }
        if (value < root.value) {
            return this.remove(value, root.left, root);
        }
        if (value > root.value) {
            return this.remove(value, root.right, root);
        }
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
        !callback ? console.log() : console.log('Level order traversal:');

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
        const leftSubtree = this.height(root.left);
        const rightSubtree = this.height(root.right);

        if (leftSubtree === rightSubtree) return true;
        if (leftSubtree + 1 === rightSubtree) return true;
        if (leftSubtree - 1 === rightSubtree) return true;

        return false;
    }

    // Method for that rebalances unbalanced tree
    rebalance() {
        const isBalanced = this.isBalanced();
        console.log(isBalanced);
        if (isBalanced) return;

        this.inOrder();
        const arr = this.sortArray(this.removeDuplicatesInArr(this.inOrderValues));
        this.root = buildTree(arr, 0, arr.length - 1);
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
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

// =======================[TESTING]======================= //
const array = [10, 20, 30, 32, 34, 36, 40, 50, 60, 70, 80, 85];
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 14, 16, 66, 77];
const BST = new Tree(array);
prettyPrint(BST.root);

BST.rebuildTree(array2);
prettyPrint(BST.root);

export function getBST() {
    return BST;
}
