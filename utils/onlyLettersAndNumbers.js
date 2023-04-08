export function onlyLettersAndNumbers(str) {
    if(!Boolean(str)) return false
    return Boolean(str.match(/^[A-Za-z0-9]*$/));
}
