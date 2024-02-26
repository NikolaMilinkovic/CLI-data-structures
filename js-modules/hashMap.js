/* eslint-disable max-classes-per-file */
import { createPara, createDiv, appendChildren } from './element-builder.js';
// ====================[ Hash Map ]==================== //
class HashMap {
    constructor(size = 16) {
        this.size = size;
        this.bucket = new Array(size)
            .fill()
            .map(() => new LinkedList());
        this.loadFactor = 0.75;
    }

    getSize() {
        return this.size;
    }

    newHashMap(size) {
        this.clear();
        this.size = size;
        this.bucket = new Array(size)
            .fill()
            .map(() => new LinkedList());
    }

    // Self imposed bucket limit
    index(hash) {
        if (hash < 0 || hash >= this.size) {
            throw new Error('Trying to access index out of bound');
        } else {
            return hash;
        }
    }

    // Method for generating hash code
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.size;
        }

        return hashCode;
    }

    // Method for assigning key & value to the hash key
    set(key, value) {
        const index = this.index(this.hash(key));
        if (this.bucket[index].checkDuplicate(key)) {
            this.bucket[index].updateValue(key, value);
        } else {
            this.bucket[index].insertNode(key, value);
        }
    }

    // Method for printing values inside a bucket
    printBucketData(index, keysArray, color) {
        let head = '';
        let linkedList = '';
        const listsEl = [];

        if (!index) {
            this.bucket.forEach((list, index) => {
                head = list.head;
                linkedList = this.toStringRedGreen(keysArray, head, color, index);
                listsEl.push(linkedList);
            });
        } else {
            listsEl.push(this.bucket[index].printData());
        }
        return listsEl;
    }

    // Method for printing the linked list with highlighted values
    toStringRedGreen(keysArray, head, color = 'red', index) {
        const parent = createDiv(['linked-list-display-div', 'cli-text', 'hash-map-print'], '');
        const elementArr = [];
        const llIndex = index + 1;
        let indent = '0';
        if (parseInt(llIndex) >= 10) {
            indent = '';
        }

        let arr = keysArray;
        if (!head) {
            elementArr.push(createPara(`<br>[Hash: ${indent}${llIndex}]-▶ `, ['hash-map-print', 'cli-text', 'hash-map-head'], '', 'para'));
            appendChildren(parent, elementArr);
            return parent;
        }
        if (!Array.isArray(keysArray)) {
            arr = [keysArray];
        }

        // Converts all values inside the array into string for evaluation
        if (arr) arr = arr.map((key) => String(key));
        const classListColored = ['hash-map-print', 'cli-text'];
        const classList = ['hash-map-print', 'cli-text'];
        const headClassList = ['hash-map-print', 'cli-text', 'hash-map-head'];
        let current = head;
        const trueOrFalse = (isHighlighted) => isHighlighted >= 0;

        // Color selector
        if (color === 'red') classListColored.push('ll-red');
        if (color === 'green') classListColored.push('ll-green');
        if (color === 'remove-all') {
            classListColored.push('ll-red');
            classList.push('ll-red');
        }

        // Handle the head element, matches the value inside array
        // Prints head value in red color, else print normal > pushes to element Arr
        // If element not found in the arr return -1 and compare to -1
        // if element is found in the array it wil return index and will go in if statement
        let keyFound = arr.indexOf(current.key.toString());
        let isHighlighted = trueOrFalse(keyFound);

        if (isHighlighted) {
            elementArr.push(createPara(`<br>[Hash: ${indent}${llIndex}]-▶ `, headClassList, '', 'para'));
            elementArr.push(createPara(`(${current.key}, ${current.value})`, classListColored, '', 'para'));
            elementArr.push(createPara('─>', classList, '', 'para'));
        } else {
            elementArr.push(createPara(`<br>[Hash: ${indent}${llIndex}]-▶ `, headClassList, '', 'para'));
            elementArr.push(createPara(`(${current.key}, ${current.value})─>`, classList, '', 'para'));
        }

        if (!current.nextNode) {
            elementArr.push(createPara('[X]', classList, '', 'para'));
            appendChildren(parent, elementArr);
            return parent;
        }
        current = current.nextNode;


        while (current.nextNode !== null) {
            // Looks for value > translates to true or false
            keyFound = arr.indexOf(current.key.toString());
            isHighlighted = trueOrFalse(keyFound);

            if (isHighlighted) {
                elementArr.push(createPara(`(${current.key}, ${current.value})`, classListColored, '', 'para'));
                elementArr.push(createPara('─>', classList, '', 'para'));
            } else {
                elementArr.push(createPara(`(${current.key}, ${current.value})─>`, classList, '', 'para'));
            }
            current = current.nextNode;
        }

        keyFound = arr.indexOf(current.key.toString());
        isHighlighted = trueOrFalse(keyFound);

        if (isHighlighted) {
            elementArr.push(createPara(`(${current.key}, ${current.value})`, classListColored, '', 'para'));
            elementArr.push(createPara('─>', classList, '', 'para'));
        } else {
            elementArr.push(createPara(`(${current.key}, ${current.value})─>`, classList, '', 'para'));
        }

        elementArr.push(createPara('[X]', classList, '', 'para'));
        appendChildren(parent, elementArr);

        return parent;
    }

    // Method that gets the value of the key if the key is present in the hash map.
    get(key) {
        let isFound = false;
        let txt = `${key} not found`;
        this.bucket.forEach((LinkedList, index) => {
            let current = LinkedList.head;


            while (current !== null) {
                if (current.key === key) {
                    txt = `Hash: ${index} Key: ${key} Value: ${current.value}`;
                    isFound = true;
                    break;
                }
                current = current.nextNode;
            }
        });
        return [isFound, txt];
    }

    // Method that checks if the key is present in the hash map, returns true if present, false if not.
    has(key) {
        let isPresent = false;
        this.bucket.forEach((LinkedList) => {
            let current = LinkedList.head;
            while (current !== null) {
                if (key === current.key) {
                    isPresent = true;
                    break;
                }

                current = current.nextNode;
            }
        });

        if (isPresent !== true) {
            return false;
        }
        return true;
    }

    // Removes the key from the hash map
    remove(key) {
        const index = this.index(this.hash(key));
        let previous;
        let current = this.bucket[index].head;

        if (current.key === key) {
            if (current.nextNode === undefined || current.nextNode === null) {
                this.bucket[index].head = null;
                return true;
            }

            this.bucket[index].head = current.nextNode;
        } else {
            previous = current;
            current = current.nextNode;
            while (current !== null) {
                if (current.key === key) {
                    previous.nextNode = current.nextNode;
                    return true;
                }
                previous = current;
                current = current.nextNode;
            }
        }
    }

    // Return the number of keys inside the hash map
    length() {
        let numOfKeys = 0;
        this.bucket.forEach((LinkedList) => {
            let current = LinkedList.head;
            while (current !== null) {
                numOfKeys++;
                current = current.nextNode;
            }
        });
    }

    // Removes all entries in the hash map
    clear() {
        this.bucket.forEach((LinkedList) => {
            LinkedList.head = null;
        });
    }

    // Returns an array containing all the keys inside the hash map
    keys() {
        const keys = [];
        let temp = [];
        let current;
        this.bucket.forEach((LinkedList, index) => {
            temp = [];
            current = LinkedList.head;
            while (current !== null) {
                temp.push(current.key);

                current = current.nextNode;
            }
            keys.push([index, temp]);
        });

        return keys;
    }

    // Returns an array containing all the values inside the hash map
    values() {
        const values = [];
        let temp = [];
        let current;
        this.bucket.forEach((LinkedList, index) => {
            temp = [];
            current = LinkedList.head;
            while (current !== null) {
                temp.push(current.value);

                current = current.nextNode;
            }
            values.push([index, temp]);
        });

        return values;
    }

    // Returns an array that contains each key / value pair
    entries() {
        const entries = [];
        let temp = [];
        let current;
        this.bucket.forEach((LinkedList, index) => {
            temp = [];
            current = LinkedList.head;
            while (current !== null) {
                temp.push([current.key, current.value]);

                current = current.nextNode;
            }
            entries.push([index, temp]);
        });

        return entries;
    }
}
// ====================[ \Hash Map ]==================== //


// ====================[ Linked List ]==================== //
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Inserts a new node into the linked list
    insertNode(newKey, newValue) {
        const newNode = new Node(newKey, newValue, this.head);
        this.head = newNode;
        this.size++;
        return newNode;
    }

    // Prints all the data from the linked list
    printData() {
        if (this.head === null) {
        } else {
            let current = this.head;
            while (current !== null) {
                current = current.nextNode;
            }
        }
    }

    // Looks for existing key inside the linked list
    checkDuplicate(key) {
        let current = this.head;
        while (current !== null) {
            if (current.key === key) {
                return true;
            }

            current = current.nextNode;
        }

        return false;
    }

    // Method for updaing the new value
    updateValue(key, newValue) {
        let current = this.head;
        while (current !== null) {
            if (current.key === key) {
                current.value = newValue;
                return;
            }

            current = current.nextNode;
        }
    }
}
// ====================[ \Linked List ]==================== //


// ====================[ Node ]==================== //
class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}
// ====================[ \Node ]==================== //


// ====================[ Testing all methods ]==================== //

// Creating new Has Map
const hm = new HashMap(10);

export function getHashMap() {
    return hm;
}

// Testing value update when multiple nodes with key are being added
hm.set('Nick', 12);
hm.set('Nick', 23);
hm.set('Nick', 43);

// Adding new key value pairs to the hash map
hm.set('Jelena', 43);
hm.set('Jenna', 43);
hm.set('Sirius', 43);
hm.set('Kitana', 43);
hm.set('Jhonny', 36);
hm.set('Carlos', 43);
hm.set('Carla', 36);
hm.set('Mario', 36);
hm.set('Marcus', 36);
hm.set('MarcusAurelius', 36);
hm.set('Konstantin', 36);
hm.set('Helena', 36);
hm.set('Caesar', 36);

// Print the data of bucket index
// hm.printBucketData(3);
// hm.printBucketData(9);

// Returns value for inserted key
// hm.get('Nick');
// hm.get('Malina');

// Method that checks if the hash map contains the given key
// hm.has('Malina');
// hm.has('Marcus');

// Testing method for removing entries
// hm.printBucketData(3);
// hm.remove('Nick');
// hm.printBucketData(3);
// hm.remove('Marcus');
// hm.printBucketData(3);
// hm.remove('Teddy');

// Method for total number of keys inside the hash map
// hm.length();

// Method that returns all keys from the hash map
// hm.keys();

// Method that returns all values from the hash map
hm.values();

// Method that returns all [key, value] pairs from the hash map
// hm.entries();

// Method that removes all entries from the hash map
// hm.clear();
// hm.length();

// ====================[ \Testing all methods ]==================== //

