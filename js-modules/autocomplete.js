export default class Autocomplete {
    constructor(keywordsArr) {
        this.keywords = keywordsArr;
    }
}


const keywordsArr = ['help', 'run', 'algorithms', 'clear', 'git', 'themes', 'theme', 'banner'];
const autocomplete = new Autocomplete(keywordsArr);

export function getAutocomplete() {
    return autocomplete;
}
