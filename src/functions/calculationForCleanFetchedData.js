export function calculate(onWhatIsFetching, fetch, fetch2) {
    let trigger;
    let fetch1StockValue;
    let fetch2StockValue;
    let SecoundFetch1StockValue;
    let SecoundFetch2StockValue;

    if (onWhatIsFetching === "forexToForex" && fetch && fetch.high && fetch.low) {
        console.log("onWhatIsFetching ", onWhatIsFetching)
        trigger = "forexToForex"

    } else if (onWhatIsFetching === "forexToCrypto" && fetch && fetch.rates) {
        trigger = "forexToCrypto"

    } else if (onWhatIsFetching === "cryptoToCrypto" && fetch && fetch2 && fetch.rates && fetch2.rates) {
        trigger = "cryptoToCrypto"

    } else if (onWhatIsFetching === "stockToForex" && fetch && fetch[0] && fetch[0].code && fetch[1].code) {
        trigger = "stockToForex"
        if (fetch[0].low === 0 || fetch[0].high === 0) {
            fetch1StockValue = fetch[0].close !== 0 ? fetch[0].close : fetch[0].previousClose
        } else {
            fetch1StockValue = ((fetch[0].high + fetch[0].low) / 2)
        }
        if (fetch[1].low === 0 || fetch[1].high === 0) {
            fetch1StockValue = fetch[1].close !== 0 ? fetch[1].close : fetch[1].previousClose
        } else {
            fetch2StockValue = ((fetch[1].high + fetch[1].low) / 2)
        }

    } else if (onWhatIsFetching === "stockToCrypto" && fetch && fetch2 && fetch[0] && fetch[0].high && fetch2.rates) {
        trigger = "stockToCrypto"
        if (fetch[0].low === 0 || fetch[0].high === 0) {
            fetch1StockValue = fetch[0].close !== 0 ? fetch[0].close : fetch[0].previousClose
        } else {
            fetch1StockValue = ((fetch[0].high + fetch[0].low) / 2)
        }

    } else if (onWhatIsFetching === "stockToStock" && fetch && fetch2 && fetch[0] && fetch2[0] && fetch[0].code && fetch2[0].code) {
        trigger = "stockToStock"
        if (fetch[0].low === 0 || fetch[0].high === 0) {
            fetch1StockValue = fetch[0].close !== 0 ? fetch[0].close : fetch[0].previousClose
        } else {
            fetch1StockValue = ((fetch[0].high + fetch[0].low) / 2)
        }
        if (fetch[1].low === 0 || fetch[1].high === 0) {
            fetch1StockValue = fetch[1].close !== 0 ? fetch[1].close : fetch[1].previousClose
        } else {
            fetch2StockValue = ((fetch[1].high + fetch[1].low) / 2)
        }

        if (fetch2[0].low === 0 || fetch2[0].high === 0) {
            SecoundFetch1StockValue = fetch2[0].close !== 0 ? fetch2[0].close : fetch2[0].previousClose
        } else {
            SecoundFetch1StockValue = ((fetch2[0].high + fetch2[0].low) / 2)
        }
        if (fetch2[1].low === 0 || fetch2[1].high === 0) {
            SecoundFetch2StockValue = fetch2[1].close !== 0 ? fetch2[1].close : fetch2[1].previousClose
        } else {
            SecoundFetch2StockValue = ((fetch2[1].high + fetch2[1].low) / 2)
        }
    }
    return ({
        trigger: trigger,
        fetch1StockValue: fetch1StockValue,
        fetch2StockValue: fetch2StockValue,
        SecoundFetch1StockValue: SecoundFetch1StockValue,
        SecoundFetch2StockValue: SecoundFetch2StockValue,
    })
}