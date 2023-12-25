import { useEffect } from "react"

export default function DisplayData({ onIsLoading, onOption1, onOption2, onFetchCopy, onFetch2Copy, onWhatIsFetching, onInvert, onSetInvert, onSecoundFormButtonSelection, onFirstFormButtonSelection }) {

    const form = onFirstFormButtonSelection
    const form2 = onSecoundFormButtonSelection

    const code = onOption1.value
    const code2 = onOption2.value

    const fetch = onFetchCopy.current
    const fetch2 = onFetch2Copy.current
    console.log("=======Display-data is rerendering ======================")

    useEffect(function () {
        if ((form === "Crypto" && form2 === "Forex") ||
            (form === "Crypto" && form2 === "Stock") ||
            (form === "Forex" && form2 === "Stock")) {
            if (onInvert === false) {
                onSetInvert(true)
                console.log("inverting throu display-data on TRUE")
            }
        } else {
            if (onInvert === true) {
                onSetInvert(false)
                console.log("inverting throu display-data on FALSE")

            }
        }
    }, [onFirstFormButtonSelection, onSecoundFormButtonSelection, onOption1, onOption2])


    console.log("Display-Data-----------------------")
    console.log("onIsLoading " + onIsLoading)
    console.log("onWhatIsFetching " + onWhatIsFetching)
    console.log("onOption1 " + JSON.stringify(onOption1))
    console.log("onOption2 " + JSON.stringify(onOption2))
    console.log("onFetchCopy " + JSON.stringify(onFetchCopy))
    console.log("onFetch2Copy " + JSON.stringify(onFetch2Copy))

    console.log("Display-Data-----------------------")






    return (
        <>
            {
                onWhatIsFetching === "forexToForex" && fetch && fetch.high && fetch.low ?
                    onIsLoading === false ?
                        <div className="result">{
                            code !== code2 ?
                                !isNaN(fetch.low) ?
                                    onInvert === false ?
                                        "1 " + code + " = " + ((fetch.high + fetch.low) / 2).toFixed(4) + " " + code2
                                        : "1 " + code2 + " = " + (1 / ((fetch.high + fetch.low) / 2)).toFixed(4) + " " + code2
                                    : `Unsupported Exchange by API: try ${code2} => ${code} then invert`
                                : "Same Currency"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "forexToCrypto" && fetch && fetch.rates ?
                    onIsLoading === false ?
                        <div className="result">{
                            onInvert === false ?
                                "1 " + code + " = " + fetch.rates[code2].toFixed(4) + " " + code2 + "'s"
                                : "1 " + code2 + " = " + (1 / fetch.rates[code2]).toFixed(4) + " " + code + "'s"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "cryptoToCrypto" && fetch && fetch2 && fetch.rates && fetch2.rates ?
                    onIsLoading === false ?
                        <div className="result">{
                            code !== code2 ?
                                onInvert === false ?
                                    "1 " + code + " = " + (fetch.rates[code] / fetch2.rates[code2]).toFixed(4) + " " + code2 + "'s"
                                    : "1 " + code2 + " = " + (1 / (fetch.rates[code] / fetch2.rates[code2])).toFixed(4) + " " + code + "'s"
                                : "Same CryptoCurrency"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "stockToForex" && fetch && fetch[0] && fetch[0].code && fetch[1].code ?
                    onIsLoading === false ?
                        <div className="result">{
                            onInvert === false ? 
                            "1 " + fetch[0].code + " = " + (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)).toFixed(4) + " " + code2
                            : "1 " + code2 + " = " + (1 / (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2))).toFixed(4) + " " + fetch[0].code + "'s"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "stockToCrypto" && fetch && fetch2 && fetch[0] && fetch[0].high && fetch2.rates ?
                    onIsLoading === false ?
                        <div className="result">{
                            onInvert === false ?
                            "1 " + fetch[0].code + " = " + (((fetch[0].high + fetch[0].low) / 2) / fetch2.rates[code2]).toFixed(4) + " " + code2 + "'s"
                            : "1 " + code2 + " = " + (1 / (((fetch[0].high + fetch[0].low) / 2) / fetch2.rates[code2])).toFixed(4) + " " + fetch[0].code + "'s"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "stockToStock" && fetch && fetch2 && fetch[0] && fetch2[0] && fetch[0].code && fetch2[0].code ?
                    onIsLoading === false ?
                        <div className="result">{
                            fetch[0].code !== fetch2[0].code ?
                            onInvert === false ? 
                                "1 " + fetch[0].code + " = " + (
                                    (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)) /
                                    (((fetch2[0].high + fetch2[0].low) / 2) * ((fetch2[1].high + fetch2[1].low) / 2))
                                ).toFixed(4) + " " + fetch2[0].code + "'s"
                                : "1 " + fetch2[0].code + " = " + (1 / (
                                    (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)) /
                                    (((fetch2[0].high + fetch2[0].low) / 2) * ((fetch2[1].high + fetch2[1].low) / 2))
                                )).toFixed(4) + " " + fetch[0].code + "'s"
                                : "Same Stock"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
        </>
    )

}