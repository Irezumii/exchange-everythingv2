
import ForexToForexExchange from "../Fetch/forex-exchange"
import FetchForexToCrypto from "../Fetch/fetch-forex-to-crypto"
import FetchCryptoToCrypto from "../Fetch/fetch-crypto-to-crypto"
import { useState, useEffect } from "react"
import invertIMG from './assets/invert.png'
import StockSearch from "../Fetch/stock-search"
import FetchStockToForex from "../Fetch/fetch-stock-to-forex"

let forexToForex = false
let forexToCrypto = false
let cryptoToCrypto = false
let stockToForex = false
let stockToCrypto = false

export default function Result(props) {

    const [displayForexCrypto, setDisplayForexCrypto] = useState(null)
    const [cryptoTarget, setCryptoTarget] = useState(null)
    const [invert, setInvert] = useState(false)
    const [cryptoFirstApiValue, setCryptoFirstApiValue] = useState(null)
    const [cryptoSecoundApiValue, setCryptoSecoundApiValue] = useState(null)
    const [stockToForexEndpoint, setStockToForexEndpoint] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    let invertValue = false;

    function handleClick() {
        setInvert(!invert)
        console.log("inwerting on " + invert)
    }


    useEffect(() => {
        setInvert(invertValue)
    }, [invertValue])

    switch (true) {
        case (
            props.onFirstFormButtonSelection === "Forex" &&
            props.onSecoundFormButtonSelection === "Forex" &&
            props.onFirstSelectedOption !== null &&
            props.onSecoundSelectedOption !== null
        ):
            forexToCrypto = false;
            forexToForex = true;
            cryptoToCrypto = false
            stockToForex = false
            stockToCrypto = false
            invertValue = false;

            // console.log("setting forexToForex on true ")
            break;

        case (
            props.onFirstFormButtonSelection === "Forex" &&
            props.onSecoundFormButtonSelection === "Crypto" &&
            props.onSetSelectedCrypto1 !== null &&
            props.CryptoExchangeTarget !== null
        ):
            forexToForex = false;
            forexToCrypto = true;
            cryptoToCrypto = false
            stockToForex = false
            stockToCrypto = false
            invertValue = false;
            break;

        case (
            props.onFirstFormButtonSelection === "Crypto" &&
            props.onSecoundFormButtonSelection === "Forex" &&
            props.onSetSelectedCrypto1 !== null &&
            props.CryptoExchangeTarget !== null
        ):
            forexToForex = false;
            forexToCrypto = true;
            cryptoToCrypto = false
            stockToForex = false
            stockToCrypto = false
            invertValue = true;
            break;

        case (
            props.onFirstFormButtonSelection === "Crypto" &&
            props.onSecoundFormButtonSelection === "Crypto" &&
            props.onFirstSelectedOption !== null &&
            props.onSecoundSelectedOption !== null
        ):
            forexToForex = false;
            forexToCrypto = false;
            cryptoToCrypto = true;
            invertValue = false;
            stockToForex = false
            stockToCrypto = false
            console.log("Setting Crypto to Crypto ON " + cryptoToCrypto)
            break;
        case (
            props.onFirstFormButtonSelection === "Stock" &&
            props.onSecoundFormButtonSelection === "Forex" &&
            props.onFirstSelectedOption !== null &&
            props.onSecoundSelectedOption !== null
        ):
            forexToForex = false;
            forexToCrypto = false;
            cryptoToCrypto = false;
            invertValue = false;
            stockToForex = true
            stockToCrypto = false
            console.log("Setting Stock to Forex ON " + stockToForex)
            break;

        default:
            break;
    }

    return (
        <>
            {forexToForex && <ForexToForexExchange
                onForexToForexState={props.onForexToForexState}
                onSetForexToForexState={props.onSetForexToForexState}
                onSecoundSelectedOption={props.onSecoundSelectedOption}
                onFirstSelectedOption={props.onFirstSelectedOption}
                onSetIsLoading={setIsLoading}
            />}

            {isLoading === true ? <div className="result">Loading...</div> : null}

            {isLoading === false && forexToForex === true ? props.onForexToForexState && props.onForexToForexState.low && props.onForexToForexState.high &&
                <>
                    {invert === false ?
                        <div div className="result">
                            {` 1 ${props.onFirstSelectedOption.value} 's = ${(props.onForexToForexState.low + props.onForexToForexState.high) / 2} ${props.onSecoundSelectedOption.value} 's`}
                        </div> :
                        <div className="result">
                            {` 1 ${props.onSecoundSelectedOption.value} 's = ${1 / ((props.onForexToForexState.low + props.onForexToForexState.high) / 2)} ${props.onFirstSelectedOption.value} 's`}
                        </div>}
                </> : null}


            {forexToCrypto && <FetchForexToCrypto onSetDisplayForexCrypto={setDisplayForexCrypto}
                onCryptoExchangeTarget={props.onCryptoExchangeTarget}

                onSelectedCrypto1={props.onSelectedCrypto2}
                onSetSelectedCrypto1={props.onSetSelectedCrypto2}

                onSelectedCrypto2={props.onSelectedCrypto1}
                onSetSelectedCrypto2={props.onSetSelectedCrypto1}
                onSetCryptoTarget={setCryptoTarget}
                onSetIsLoading={setIsLoading}
            />}

            {isLoading === false && forexToCrypto && displayForexCrypto && displayForexCrypto.rates && displayForexCrypto.target !== null ?
                <>
                    {invert === false ? <div className="result" >{`1 ${displayForexCrypto.target} 's = ${displayForexCrypto.rates[cryptoTarget]} ${cryptoTarget} 's `}</div>
                        : <div className="result" >{`1 ${cryptoTarget} 's = ${1 / displayForexCrypto.rates[cryptoTarget]} ${displayForexCrypto.target} 's `}</div>
                    }
                </> : null}


            {cryptoToCrypto && <FetchCryptoToCrypto

                oncryptoFirstApiValue={cryptoFirstApiValue}
                onSetCryptoFirstApiValue={setCryptoFirstApiValue}

                oncryptoSecoundApiValue={cryptoSecoundApiValue}
                onSetCryptoSecoundApiValue={setCryptoSecoundApiValue}


                onFirstSelectedOption={props.onFirstSelectedOption}
                onSecoundSelectedOption={props.onSecoundSelectedOption}
                onSetIsLoading={setIsLoading}
            />}

            {isLoading === false && props.onFirstSelectedOption && props.onSecoundSelectedOption && props.onFirstSelectedOption.value && props.onSecoundSelectedOption.value && cryptoToCrypto && cryptoFirstApiValue !== null && cryptoSecoundApiValue !== null && cryptoSecoundApiValue.rates && cryptoFirstApiValue.rates ?
                <>
                    {invert === false ? <div className="result" >{`1 ${props.onFirstSelectedOption.value} 's = ${cryptoFirstApiValue.rates[props.onFirstSelectedOption.value] / cryptoSecoundApiValue.rates[props.onSecoundSelectedOption.value]} ${props.onSecoundSelectedOption.value} 's `}</div>
                        : <div className="result" >{`1 ${props.onSecoundSelectedOption.value} 's = ${cryptoSecoundApiValue.rates[props.onSecoundSelectedOption.value] / cryptoFirstApiValue.rates[props.onFirstSelectedOption.value]} ${props.onFirstSelectedOption.value} 's `}</div>
                    }
                </> : null}

            {stockToForex && <FetchStockToForex
                onSetIsLoading={setIsLoading}
                onFirstSelectedOption={props.onFirstSelectedOption}
                onSecoundSelectedOption={props.onSecoundSelectedOption}
                onSetStockToForexEndpoint={setStockToForexEndpoint}
            />}

            {isLoading === false && stockToForex && props.onFirstSelectedOption !== null && props.onFirstSelectedOption !== null && stockToForexEndpoint !== null ?
                <>
                    {invert === false ? 
                    <div className="result">{"1 " + stockToForexEndpoint[0].code + " = " + ((stockToForexEndpoint[0].high + stockToForexEndpoint[0].low) / 2) * ((stockToForexEndpoint[1].high + stockToForexEndpoint[1].low) / 2) + " " + props.onSecoundSelectedOption.value}</div>
                : null}
                </>
                : null}

            <div className="invert" onClick={handleClick}><img src={invertIMG} alt="" /></div>
        </>
    )
}