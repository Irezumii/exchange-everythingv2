export function whatIsFetchingAssign(option1, option2, form1, form2){
    
        let invertingOptions ;
        const whatIsFetching = assignWhatIsFetching()
        
        //Because the API has a specific order of characters to download data, 
        //this function sets this order and returns information about whether the order is inverted or not.
        function checkingFetchConditions(el1, el2 = el1) {
            if (option1 !== null && option2 !== null) {
                if (form1 === el1 && form2 === el2) {
                    invertingOptions = false
                    return true
                } else if (form1 === el2 && form2 === el1) {
                    invertingOptions = true
                    return true
                } else return false
            }
    
        }
    
        //WhatIsFetching informs the useFetch hook about what will be downloaded
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
    
        return { whatIsFetching, invertingOptions }
    
    }
