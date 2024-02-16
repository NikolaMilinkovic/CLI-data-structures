export default class HistoryTracker {
    constructor(parentId) {
        this.parentEl = document.getElementById(parentId);
        this.history = [];
        this.tracker = 0;
    }

    pushInputToHistory(inputValue) {
        this.history.push(inputValue);
    }

    resetHistoryTracker() {
        this.tracker = this.history.length;
    }

    displayHistoryInput(lastInput) {
        if (this.tracker !== -1) lastInput.value = this.history[this.tracker];
        else lastInput.value = '';
    }

    arrowUp() {
        this.tracker--;
        if (this.tracker < 0) this.tracker = -1;
    }

    arrowDown() {
        this.tracker++;
        if (this.tracker > this.history.length - 1) this.tracker = this.history.length - 1;
    }
}

const history = new HistoryTracker('cli-section');

export function getHistory() {
    return history;
}
