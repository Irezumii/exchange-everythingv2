export function optionsAssign(optionFirst, optionSecound, invert){

    let option1;
    let option2;
    let invertingTrigger;

    if (invert === false) {
        option1 = optionFirst
        option2 = optionSecound
        invertingTrigger = false
    } else {
        option1 = optionSecound
        option2 = optionFirst
        invertingTrigger = true
    }
    return {option1, option2, invertingTrigger}
}