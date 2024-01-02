import { calculate } from "./calculationForCleanFetchedData"

export default function cleanFetchedData(onWhatIsFetching, code, code2, fetch, fetch2, onAmount, onInvert, onOption1, onOption2) {



    const {
        trigger,
        fetch1StockValue,
        fetch2StockValue,
        SecoundFetch1StockValue,
        SecoundFetch2StockValue
    } = calculate(onWhatIsFetching, fetch, fetch2)

    if (trigger === "forexToForex") {
        if (code === code2) {
            return "Same Currency"
        }
        if (isNaN(fetch.low)) {
            return "Unsupported Exchange by API:"
        }
        if (onInvert === false) {
            return ({
                name: code,
                name2: code2,
                form: "Fx",
                form2: "Fx",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * ((fetch.high + fetch.low) / 2)).toFixed(4)
            })
        } else return ({
            name: code2,
            name2: code,
            form: "Fx",
            form2: "Fx",
            label: onOption2.label,
            label2: onOption1.label,
            amount: onAmount,
            exchange: (onAmount * (1 / ((fetch.high + fetch.low) / 2))).toFixed(4),
        })

    } else if (trigger === "forexToCrypto") {
        if (onInvert === false) {
            return ({
                name: code,
                name2: code2,
                form: "Fx",
                form2: "Cr",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * fetch.rates[code2]).toFixed(4)
            })
        } else {
            return ({
                name: code2,
                name2: code,
                form: "Cr",
                form2: "Fx",
                label: onOption2.label,
                label2: onOption1.label,
                amount: onAmount,
                exchange: (onAmount * (1 / fetch.rates[code2])).toFixed(4)
            })
        }
    } else if (trigger === "cryptoToCrypto") {
        if (code === code2) {
            return "Same CryptoCurrency"
        }

        if (onInvert === false) {
            return ({
                name: code,
                name2: code2,
                form: "Cr",
                form2: "Cr",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (fetch.rates[code] / fetch2.rates[code2])).toFixed(4)
            })
        } else {
            return ({
                name: code2,
                name2: code,
                form: "Cr",
                form2: "Cr",
                label: onOption2.label,
                label2: onOption1.label,
                amount: onAmount,
                exchange: (onAmount * (1 / (fetch.rates[code] / fetch2.rates[code2]))).toFixed(4)
            })
        }
    } else if (trigger === "stockToForex") {
        if (onInvert === false) {
            return ({
                name: fetch[0].code,
                name2: code2,
                form: "St",
                form2: "Fx",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (fetch1StockValue * fetch2StockValue)).toFixed(4)
            })
        } else {
            return ({
                name: code2,
                name2: fetch[0].code,
                form: "Fx",
                form2: "St",
                label: onOption2.label,
                label2: onOption1.label,
                amount: onAmount,
                exchange: (onAmount * (1 / (fetch1StockValue * fetch2StockValue))).toFixed(4)
            })
        }

    } else if (trigger === "stockToCrypto") {
        if (onInvert === false) {
            return ({
                name: fetch[0].code,
                name2: code2,
                form: "St",
                form2: "Cr",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (fetch1StockValue / fetch2.rates[code2]).toFixed(4)),
            })
        } else {
            return ({
                name: code2,
                name2: fetch[0].code,
                form: "Cr",
                form2: "St",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (1 / (fetch1StockValue / fetch2.rates[code2])).toFixed(4)),
            })
        }
    } else if (trigger === "stockToStock") {
        if (fetch[0].code === fetch2[0].code) {
            return "Same Stock"
        }
        if (onInvert === false) {
            return ({
                name: fetch[0].code,
                name2: fetch2[0].code,
                form: "St",
                form2: "St",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (
                    (fetch1StockValue * fetch2StockValue) /
                    (SecoundFetch1StockValue * SecoundFetch2StockValue)
                ).toFixed(4))
            })
        } else {
            return ({
                name: fetch2[0].code,
                name2: fetch[0].code,
                form: "St",
                form2: "St",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (1 / (
                    (fetch1StockValue * fetch2StockValue) /
                    (SecoundFetch1StockValue * SecoundFetch2StockValue)
                )).toFixed(4))
            })

        }
    }
}
