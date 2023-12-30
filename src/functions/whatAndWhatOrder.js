export default function whatAndWhatOrder(option1, option2, form1, form2) {
    
    const whatIsFetching = assignWhatIsFetching()
    
    function checkingFetchConditions(el1, el2 = el1) {
        if (option1 !== null && option2 !== null) {
            if (form1 === el1 && form2 === el2) {
                return true
            } else if (form1 === el2 && form2 === el1) {
                const temp = option2
                option2 = option1
                option1 = temp
                return true
            } else return false
        }

    }

    function assignWhatIsFetching() {
        switch (true) {
            case (checkingFetchConditions("Forex")):
                return "forexToForex"

            case (checkingFetchConditions("Forex", "Crypto")):
                return "forexToCrypto"

            case (checkingFetchConditions("Crypto")):
                return "cryptoToCrypto"

            case (checkingFetchConditions("Stock", "Forex")):
                return "stockToForex"

            case (checkingFetchConditions("Stock", "Crypto")):
                return "stockToCrypto"

            case (checkingFetchConditions("Stock")):
                return "stockToStock"

            default:
                return null
        }
    }

    return { whatIsFetching, option1, option2 }

}