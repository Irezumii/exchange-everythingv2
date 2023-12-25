
export default function DisplayData({ onIsLoading, onOption1, onOption2, onFetchCopy, onFetch2Copy, onWhatIsFetching }) {


    // prawdopodobie onWhatIsFetching że jest przekazywany przez props. re-renderuje element i odpala kod w którym są"stare" dane a nie te które być powinny 

    console.log("Display-Data-----------------------")
    console.log("onIsLoading " + onIsLoading)
    console.log("onWhatIsFetching " + onWhatIsFetching)
    console.log("onOption1 " + JSON.stringify(onOption1))
    console.log("onOption2 " + JSON.stringify(onOption2))
    console.log("onFetchCopy " + JSON.stringify(onFetchCopy))
    console.log("onFetch2Copy " + JSON.stringify(onFetch2Copy))

    console.log("Display-Data-----------------------")


    const code = onOption1.value
    const code2 = onOption2.value

    const fetch = onFetchCopy.current
    const fetch2 = onFetch2Copy.current


    // switch (onWhatIsFetching) {
    //     case "forexToForex":
    //         if (onIsLoading === false) {
    //             if (code === code2) {
    //                 return "Same Currency"
    //             } else if (isNaN(fetch.low)) {
    //                 return `Unsupported Exchange by API: try ${code2} => ${code} then invert`
    //             } else return ("1 " + code + " = " + ((fetch.high + fetch.low) / 2).toFixed(4) + " " + code2)
    //         } else return "Loading..."

    //     case ("forexToCrypto"):
    //         if (onIsLoading === false) {
    //             return "1 " + code + " = " + fetch.rates[code2].toFixed(6) + " " + code2 + "'s"
    //         } else return "Loading..."

    //     case ("cryptoToCrypto"):
    //         if (onIsLoading === false) {
    //             if (code === code2) {
    //                 return "Same CryptoCurrency"
    //             } else {
    //                 return "1 " + code + " = " + (fetch.rates[code] / fetch2.rates[code2]).toFixed(4) + " " + code2 + "'s"
    //             }
    //         } else return "Loading..."

    //     case ("stockToForex"):
    //         if (onIsLoading === false) {
    //             return "1 " + fetch[0].code + " = " + (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)).toFixed(4) + " " + code2
    //         } else return "Loading..."

    //     case ("stockToCrypto"):
    //         if (onIsLoading === false) {
    //             return "1 " + fetch[0].code + " = " + (((fetch[0].high + fetch[0].low) / 2) / fetch2.rates[code2]).toFixed(4) + " " + code2 + "'s"
    //         } else return "Loading..."

    //     case ("stockToStock"):
    //         if (onIsLoading === false) {
    //             if (fetch[0].code === fetch2[0].code) {
    //                 return "Same Stock"
    //             } else {
    //                 return ("1 " + fetch[0].code + " = " + (
    //                     (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)) /
    //                     (((fetch2[0].high + fetch2[0].low) / 2) * ((fetch2[1].high + fetch2[1].low) / 2))
    //                 ).toFixed(4) + " " + fetch2[0].code + "'s")
    //             }
    //         } else return "Loading..."

    //     default: break
    // }

    return (
        <>
            {
                onWhatIsFetching === "forexToForex" && fetch && fetch.high && fetch.low ?
                    onIsLoading === false ?
                        <div className="result">{
                            code !== code2 ?
                                !isNaN(fetch.low) ?
                                    "1 " + code + " = " + ((fetch.high + fetch.low) / 2).toFixed(4) + " " + code2
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
                            "1 " + code + " = " + fetch.rates[code2].toFixed(6) + " " + code2 + "'s"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "cryptoToCrypto" && fetch && fetch2 && fetch.rates && fetch2.rates ?
                    onIsLoading === false ?
                        <div className="result">{
                            code !== code2 ?
                                "1 " + code + " = " + (fetch.rates[code] / fetch2.rates[code2]).toFixed(4) + " " + code2 + "'s"
                                : "Same CryptoCurrency"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "stockToForex" && fetch && fetch[0] && fetch[0].code && fetch[1].code ?
                    onIsLoading === false ?
                        <div className="result">{
                            "1 " + fetch[0].code + " = " + (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)).toFixed(4) + " " + code2
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "stockToCrypto" && fetch && fetch2 && fetch[0] && fetch[0].high && fetch2.rates ?
                    onIsLoading === false ?
                        <div className="result">{
                            "1 " + fetch[0].code + " = " + (((fetch[0].high + fetch[0].low) / 2) / fetch2.rates[code2]).toFixed(4) + " " + code2 + "'s"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
            {
                onWhatIsFetching === "stockToStock" && fetch && fetch2 && fetch[0] && fetch2[0] && fetch[0].code && fetch2[0].code ?
                    onIsLoading === false ?
                        <div className="result">{
                            fetch[0].code !== fetch2[0].code ?
                                "1 " + fetch[0].code + " = " + (
                                    (((fetch[0].high + fetch[0].low) / 2) * ((fetch[1].high + fetch[1].low) / 2)) /
                                    (((fetch2[0].high + fetch2[0].low) / 2) * ((fetch2[1].high + fetch2[1].low) / 2))
                                ).toFixed(4) + " " + fetch2[0].code + "'s"
                                : "Same Stock"
                        }</div>
                        : <div className="result">Loading...</div>
                    : null
            }
        </>
    )

}