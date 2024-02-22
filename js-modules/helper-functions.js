
// Evaluates user input, returns false if validation fails
export function inputRegexValidator(input) {
    if (input.value === '') return false;
    if (!/^-?\d+(\s*-?\d+)*$/.test(input.value)) {
        inputAlert();
        return false;
    }

    return true;
}

function inputAlert() {
    alert('Input contains invalid characters. Please enter only numbers separated by spaces or commas.');
    input.focus();
}

export function buildArray(input) {
    let array = [];
    if (input.value.includes(' ')) array = input.value.split(' ').map((value) => value.trim()).filter((item) => item !== '');
    else if (input.value.includes(',')) array = input.value.split(',').map((value) => value.trim()).filter((item) => item !== '');
    else (array = input.value);

    console.log('buildArray started');
    console.log(array);
    return array;
}

export function isBalancedTreeText(balanced) {
    // const input = document.getElementById('input-balanced');
    if (balanced === true) {
        // input.style.placeholder.color = '#08FF83';
        return 'The tree is balanced.';
    }
    // input.style.placeholder.color = '#FF1E8E';
    return 'The tree is not balanced';
}


// Method for clearing all div children
export function clearDiv(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


export function typeWriteText(rawText = '', element, parentEl = '', speed = 20, insertBr = false, returnValue = false, firstChild = false) {
    if (firstChild) {
        parentEl.insertBefore(element, parentEl.firstChild);
    } else {
        parentEl.appendChild(element);
    }
    return new Promise((resolve) => {
        const text = rawText.replace(/<br>/g, '\n').split('\n');


        let charArr;
        let charIndex = 0;
        text.forEach((arr) => {
            charArr = arr.split('');
            charArr.forEach((char) => {
                setTimeout(() => {
                    if (element instanceof HTMLSpanElement) element.textContent += char;
                    else element.innerHTML += char;
                }, speed * charIndex++);
            });

            if (insertBr) {
                setTimeout(() => {
                    element.innerHTML += '<br>';
                }, speed * charIndex++);
            }
        });

        if (returnValue) {
            setTimeout(() => {
                resolve(true);
            }, speed * charIndex++);
        }
    });
}


export function typeWriteTextArr(element_text, parentEl, speed = 20) {
    return element_text.reduce((prevPromise, [element, text]) => prevPromise.then(() => new Promise((resolve) => {
        typeWriteText(text, element, parentEl, speed, false, false);
        setTimeout(resolve, speed * text.length);
    })), Promise.resolve())
        .then(() => true); // Resolve with true after all animations are complete
}
