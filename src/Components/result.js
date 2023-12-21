
import { useState, useEffect, useRef } from "react"
import invertIMG from './assets/invert.png'
import { useFetch } from "../hooks/useFetch";

let whatIsFetching;
let trigger = 0;
let doubleFetching = false
// let copyOfFetchedData;
// let copyOfFetchedData2;

export default function Result(props) {
    console.log("==============result is re-rendering====================")

    const copyOfFetchedData = useRef(null)
    const copyOfFetchedData2 = useRef(null)
    const [invert, setInvert] = useState(false)
    const { fetchedData, setFetchedData, fetchedData2, setFetchedData2, fetchingForm, isLoading, setFetchingFrom, setSelectedFirstOption, setSelectedSecoundOption, setOnlyOneOption } = useFetch()

    let invertValue = false;

    let option1 = props.onFirstSelectedOption
    let option2 = props.onSecoundSelectedOption

    const form1 = props.onFirstFormButtonSelection
    const form2 = props.onSecoundFormButtonSelection


    function inverting(el) {
        if (form1 === el) {
            option1 = props.onFirstSelectedOption
            option2 = props.onSecoundSelectedOption
        } else {
            option2 = props.onFirstSelectedOption
            option1 = props.onSecoundSelectedOption
        }
    }

    function handleClick() {
        setInvert(!invert)
        console.log("inwerting on " + invert)
    }
    useEffect(function () {
        if (fetchingForm !== null && setSelectedFirstOption !== null & setSelectedSecoundOption !== null) {
            setFetchingFrom(whatIsFetching)
            setSelectedFirstOption(option1)
            setSelectedSecoundOption(option2)
            if (doubleFetching === "false") {
                setOnlyOneOption(null)
            } else setOnlyOneOption(true)
        }
    }, [option1, option2])
    // useEffect(() => {
    //     if (fetchingForm !== null && setSelectedFirstOption !== null & setSelectedSecoundOption !== null) {
    //         setFetchingFrom(whatIsFetching)
    //         setSelectedFirstOption(option1)
    //         setSelectedSecoundOption(option2)
    //         if (doubleFetching === "false") {
    //             setOnlyOneOption(null)
    //         } else setOnlyOneOption(true)
    //     }
    // }, [trigger])


    useEffect(() => {
        setInvert(invertValue)
    }, [invertValue])

    if (fetchedData !== null) {
        copyOfFetchedData.current = fetchedData
        setFetchedData(null)
        console.log("copyOfFetchedData " + JSON.stringify(copyOfFetchedData.current))
    }
    if (fetchedData2 !== null) {
        copyOfFetchedData2.current = fetchedData2
        setFetchedData2(null)
        console.log("copyOfFetchedData2 " + JSON.stringify(copyOfFetchedData2.current))
    }
    if (whatIsFetching !== "cryptoToCrypto" && whatIsFetching !== "stockToStock" && whatIsFetching !== "stockToCrypto") {
        copyOfFetchedData2.current = null
    }

    if (fetchedData === null && fetchedData2 === null && form1 !== null && form2 !== null && option1 !== null && option2 !== null) {
        // nie może być true/false !trigger poniewąz podwójne rendery zwracają cały czas false
        // trigger = trigger + 1
        console.log("triggering " + trigger)
    }


    switch (true) {
        case (form1 === "Forex" && form2 === "Forex" && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "forexToForex"
            console.log("whatIsFetching " + whatIsFetching)
            // inverting("Forex")
            break;

        case (((form1 === "Forex" && form2 === "Crypto") || (form1 === "Crypto" && form2 === "Forex")) && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "forexToCrypto"
            console.log("whatIsFetching " + whatIsFetching)
            inverting("Forex")
            break;

        case (form1 === "Crypto" && form2 === "Crypto" && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "cryptoToCrypto"
            console.log("whatIsFetching " + whatIsFetching)
            // inverting("Crypto")
            break;

        case (((form1 === "Stock" && form2 === "Forex") || (form1 === "Forex" && form2 === "Stock")) && option1 !== null && option2 !== null):

            if (props.onFirstFormButtonSelection === "Stock") {
                invertValue = false
            } else {
                invertValue = true
            }
            invertValue = false
            whatIsFetching = "stockToForex"
            console.log("whatIsFetching " + whatIsFetching)
            inverting("Stock")
            break;
        case ((form1 === "Stock" && form2 === "Stock") && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "stockToStock"
            console.log("whatIsFetching " + whatIsFetching)
            break;
        case ((form1 === "Stock" && form2 === "Crypto") && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "stockToCrypto"
            console.log("whatIsFetching " + whatIsFetching)
            break;

        default:
            break;
    }

    // return (
    //     <>
    //         {whatIsFetching === "forexToForex" && <ForexToForexExchange
    //             onForexToForexState={props.onForexToForexState}
    //             onSetForexToForexState={props.onSetForexToForexState}
    //             onSecoundSelectedOption={props.onSecoundSelectedOption}
    //             onFirstSelectedOption={props.onFirstSelectedOption}
    //             onSetIsLoading={setIsLoading}
    //         />}

    //         {isLoading === true ? <div className="result">Loading...</div> : null}

    //         {isLoading === false && whatIsFetching === "forexToForex" ? props.onForexToForexState && props.onForexToForexState.low && props.onForexToForexState.high &&
    //             <>
    //                 {invert === false ?
    //                     <div div className="result">
    //                         {` 1 ${props.onFirstSelectedOption.value} 's = ${(props.onForexToForexState.low + props.onForexToForexState.high) / 2} ${props.onSecoundSelectedOption.value} 's`}
    //                     </div> :
    //                     <div className="result">
    //                         {` 1 ${props.onSecoundSelectedOption.value} 's = ${1 / ((props.onForexToForexState.low + props.onForexToForexState.high) / 2)} ${props.onFirstSelectedOption.value} 's`}
    //                     </div>}
    //             </> : null}


    //         {whatIsFetching === "forexToCrypto" && <FetchForexToCrypto onSetDisplayForexCrypto={setDisplayForexCrypto}
    //             onCryptoExchangeTarget={props.onCryptoExchangeTarget}

    //             onSelectedCrypto1={props.onSelectedCrypto2}
    //             onSetSelectedCrypto1={props.onSetSelectedCrypto2}

    //             onSelectedCrypto2={props.onSelectedCrypto1}
    //             onSetSelectedCrypto2={props.onSetSelectedCrypto1}
    //             onSetCryptoTarget={setCryptoTarget}
    //             onSetIsLoading={setIsLoading}
    //         />}

    //         {isLoading === false && whatIsFetching === "forexToCrypto" && displayForexCrypto && displayForexCrypto.rates && displayForexCrypto.target !== null ?
    //             <>
    //                 {invert === false ? <div className="result" >{`1 ${displayForexCrypto.target} 's = ${displayForexCrypto.rates[cryptoTarget]} ${cryptoTarget} 's `}</div>
    //                     : <div className="result" >{`1 ${cryptoTarget} 's = ${1 / displayForexCrypto.rates[cryptoTarget]} ${displayForexCrypto.target} 's `}</div>
    //                 }
    //             </> : null}


    //         {whatIsFetching === "cryptoToCrypto" && <FetchCryptoToCrypto

    //             oncryptoFirstApiValue={cryptoFirstApiValue}
    //             onSetCryptoFirstApiValue={setCryptoFirstApiValue}

    //             oncryptoSecoundApiValue={cryptoSecoundApiValue}
    //             onSetCryptoSecoundApiValue={setCryptoSecoundApiValue}


    //             onFirstSelectedOption={props.onFirstSelectedOption}
    //             onSecoundSelectedOption={props.onSecoundSelectedOption}
    //             onSetIsLoading={setIsLoading}
    //         />}

    //         {isLoading === false && props.onFirstSelectedOption && props.onSecoundSelectedOption && props.onFirstSelectedOption.value && props.onSecoundSelectedOption.value && whatIsFetching === "cryptoToCrypto" && cryptoFirstApiValue !== null && cryptoSecoundApiValue !== null && cryptoSecoundApiValue.rates && cryptoFirstApiValue.rates ?
    //             <>
    //                 {invert === false ? <div className="result" >{`1 ${props.onFirstSelectedOption.value} 's = ${cryptoFirstApiValue.rates[props.onFirstSelectedOption.value] / cryptoSecoundApiValue.rates[props.onSecoundSelectedOption.value]} ${props.onSecoundSelectedOption.value} 's `}</div>
    //                     : <div className="result" >{`1 ${props.onSecoundSelectedOption.value} 's = ${cryptoSecoundApiValue.rates[props.onSecoundSelectedOption.value] / cryptoFirstApiValue.rates[props.onFirstSelectedOption.value]} ${props.onFirstSelectedOption.value} 's `}</div>
    //                 }
    //             </> : null}

    //         {whatIsFetching === "stockToForex" && <FetchStockToForex
    //             onSetIsLoading={setIsLoading}
    //             onFirstSelectedOption={props.onFirstSelectedOption}
    //             onSecoundSelectedOption={props.onSecoundSelectedOption}
    //             onSetStockToForexEndpoint={setStockToForexEndpoint}
    //         />}

    //         {isLoading === false && whatIsFetching === "stockToForex" && props.onFirstSelectedOption !== null && props.onFirstSelectedOption !== null && stockToForexEndpoint !== null ?
    //             <>
    //                 {invert === false ?
    //                     <div className="result">{"1 " + stockToForexEndpoint[0].code + " = " + ((stockToForexEndpoint[0].high + stockToForexEndpoint[0].low) / 2) * ((stockToForexEndpoint[1].high + stockToForexEndpoint[1].low) / 2) + " " + props.onSecoundSelectedOption.value}</div>
    //                     : null}
    //             </>
    //             : null}

    //         <div className="invert" onClick={handleClick}><img src={invertIMG} alt="" /></div>
    //     </>
    // )
    return (
        <>
            {/* <div className="invert" style={{bottom: "10%"}} onClick={handleClickSearch}>search</div> */}
            {isLoading === false ? <div className="result">{JSON.stringify(copyOfFetchedData)}</div> :
            <div className="result">Loading...</div>}
            <div className="invert" onClick={handleClick}><img src={invertIMG} alt="" /></div>
            {console.log("copyOfFetchedData " + JSON.stringify(copyOfFetchedData.current))}
            {console.log("copyOfFetchedData2 " + JSON.stringify(copyOfFetchedData2.current))}
        </>
    )
}