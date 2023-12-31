export default function cleanFetchedData(onWhatIsFetching, code, code2, fetch, fetch2, onAmount, onInvert, onFirstFormButtonSelection, onSecoundFormButtonSelection, onOption1, onOption2) {

    if (onWhatIsFetching === "forexToForex" && fetch && fetch.high && fetch.low) {
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
            form: onSecoundFormButtonSelection,
            form2: onFirstFormButtonSelection,
            label: onOption2.label,
            label2: onOption1.label,
            amount: onAmount,
            exchange: (onAmount * (1 / ((fetch.high + fetch.low) / 2))).toFixed(4),
        })

    } else if (onWhatIsFetching === "forexToCrypto" && fetch && fetch.rates) {
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
    } else if (onWhatIsFetching === "cryptoToCrypto" && fetch && fetch2 && fetch.rates && fetch2.rates) {
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
    } else if (onWhatIsFetching === "stockToForex" && fetch && fetch[0] && fetch[0].code && fetch[1].code) {
        if (onInvert === false) {
            return ({
                name: fetch[0].code,
                name2: code2,
                form: "St",
                form2: "Fx",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2))).toFixed(4)
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
                exchange: (onAmount * (1 / (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)))).toFixed(4)
            })
        }

    } else if (onWhatIsFetching === "stockToCrypto" && fetch && fetch2 && fetch[0] && fetch[0].high && fetch2.rates) {
        if (onInvert === false) {
            return ({
                name: fetch[0].code,
                name2: code2,
                form: "St",
                form2: "Cr",
                label: onOption1.label,
                label2: onOption2.label,
                amount: onAmount,
                exchange: (onAmount * (((fetch[0].high + fetch[0].low) / 2) / fetch2.rates[code2]).toFixed(4)),
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
                exchange: (onAmount * (1 / (((fetch[0].high + fetch[0].low) / 2) / fetch2.rates[code2])).toFixed(4)),
            })
        }
    } else if (onWhatIsFetching === "stockToStock" && fetch && fetch2 && fetch[0] && fetch2[0] && fetch[0].code && fetch2[0].code) {
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
                    (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)) /
                    (((fetch2[0].high + fetch2[0].low) / 2) * ((fetch2[1].high + fetch2[1].low) / 2))
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
                    (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)) /
                    (((fetch2[0].high + fetch2[0].low) / 2) * ((fetch2[1].high + fetch2[1].low) / 2))
                )).toFixed(4))
            })

        }
    }
}
