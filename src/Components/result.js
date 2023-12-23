
import { useState, useEffect, useRef } from "react"
import invertIMG from './assets/invert.png'
import { useFetch } from "../hooks/useFetch";

let whatIsFetching;
// let copyOfFetchedData;
// let copyOfFetchedData2;

export default function Result(props) {
    console.log("==============result is re-rendering====================")

    const copyOfFetchedData = useRef(null)
    const copyOfFetchedData2 = useRef(null)
    const [invert, setInvert] = useState(false)
    const {
        fetchedData,
        setFetchedData,
        fetchedData2,
        setFetchedData2,
        fetchingForm,
        setFetchingFrom,
        isLoading,
        setIsLoading,
        setSelectedFirstOption,
        setSelectedSecoundOption } = useFetch()

    let invertValue = false;

    let option1 = props.onFirstSelectedOption
    let option2 = props.onSecoundSelectedOption

    const form1 = props.onFirstFormButtonSelection
    const form2 = props.onSecoundFormButtonSelection


    function invertingForms(el) {
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
        console.log("invertingForms on " + invert)
    }
    useEffect(function () {
        if (fetchingForm !== null) {
            setFetchingFrom(whatIsFetching)
            setSelectedFirstOption(option1)
            setSelectedSecoundOption(option2)
        }
    }, [option1, option2])

    useEffect(() => {
        setInvert(invertValue)
    }, [invertValue])

    if (fetchedData !== null) {
        copyOfFetchedData.current = fetchedData 
        setFetchedData(null)
        console.log(" passing data to copyOfFetchedData")
    }
    if (fetchedData2 !== null) {
        copyOfFetchedData2.current = fetchedData2 
        setFetchedData2(null)
        console.log("passing data to copyOfFetchedData2")
    }
    if (whatIsFetching !== "cryptoToCrypto" && whatIsFetching !== "stockToStock" && whatIsFetching !== "stockToCrypto") {
        copyOfFetchedData2.current = null
    }

    switch (true) {
        case (form1 === "Forex" && form2 === "Forex" && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "forexToForex"
            break;

        case (((form1 === "Forex" && form2 === "Crypto") || (form1 === "Crypto" && form2 === "Forex")) && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "forexToCrypto"
            invertingForms("Forex")
            break;

        case (form1 === "Crypto" && form2 === "Crypto" && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "cryptoToCrypto"
            break;

        case (((form1 === "Stock" && form2 === "Forex") || (form1 === "Forex" && form2 === "Stock")) && option1 !== null && option2 !== null):

            if (form1 === "Stock") {
                invertValue = false
            } else {
                invertValue = true
            }
            invertValue = false
            whatIsFetching = "stockToForex"
            invertingForms("Stock")
            break;
        case ((form1 === "Stock" && form2 === "Stock") && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "stockToStock"
            break;
        case ((form1 === "Stock" && form2 === "Crypto") && option1 !== null && option2 !== null):

            invertValue = false
            whatIsFetching = "stockToCrypto"
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
            {isLoading === false ? <div className="result">{JSON.stringify(copyOfFetchedData)}</div> :
                <div className="result">Loading...</div>}
            <div className="invert" onClick={handleClick}><img src={invertIMG} alt="" /></div>
            {console.log("copyOfFetchedData " + JSON.stringify(copyOfFetchedData.current))}
            {console.log("copyOfFetchedData2 " + JSON.stringify(copyOfFetchedData2.current))}
        </>
    )
}