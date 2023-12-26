
import { useState, useEffect, useRef } from "react"
import invertIMG from './assets/invert.png'
import { useFetch } from "../hooks/useFetch";
import DisplayData from "./Content/results-components/display-data";

export default function Result(props) {
    console.log("==============result is re-rendering====================")

    // const [invert, setInvert] = useState(false)

    const fetchCopy = useRef(null)
    const fetch2Copy = useRef(null)
    const whatIsFetchingRef = useRef(null)

    // function handleInvert(){
    //     setInvert(!invert)
    // }

    const {
        fetchedData,
        setFetchedData,
        fetchedData2,
        setFetchedData2,
        isLoading,
        setIsLoading,
        fetchingFrom,
        setFetchingFrom,
        setSelectedFirstOption,
        setSelectedSecoundOption } = useFetch()

    useEffect(function () {
        setFetchingFrom(whatIsFetching)
        setSelectedFirstOption(option1)
        setSelectedSecoundOption(option2)
        props.onFirstSelectedOption !== null && props.onSecoundSelectedOption !== null && setIsLoading(true)
    }, [props.onFirstSelectedOption, props.onSecoundSelectedOption])


    let option1 = props.onFirstSelectedOption
    let option2 = props.onSecoundSelectedOption

    const form1 = props.onFirstFormButtonSelection
    const form2 = props.onSecoundFormButtonSelection

    let whatIsFetching = whatIsFetchingRef.current


    function copyFetchData(data, setData, dataCopy) {
        if (data !== null) {
            dataCopy.current = data
            setData(null)
            console.log(`passing data to copy and Clearing fetchData 1 or 2`)
        }
    }

    function checkingRenderConditions() {
        if (option1 && option2 && option1.value && option2.value && fetchCopy && fetchCopy.current) {
            return true
        } else return false
    }

    function checkingFetchConditions(el1, el2 = el1) {
        if (option1 !== null && option2 !== null) {
            if (form1 === el1 && form2 === el2) {
                return true
            } else if (form1 === el2 && form2 === el1) {
                option2 = props.onFirstSelectedOption
                option1 = props.onSecoundSelectedOption
                return true
            } else return false
        }

    }

    switch (true) {
        case (checkingFetchConditions("Forex")):
            whatIsFetching = "forexToForex"
            break;

        case (checkingFetchConditions("Forex", "Crypto")):
            whatIsFetching = "forexToCrypto"
            break;

        case (checkingFetchConditions("Crypto")):
            whatIsFetching = "cryptoToCrypto"
            break;

        case (checkingFetchConditions("Stock", "Forex")):
            whatIsFetching = "stockToForex"
            break;

        case (checkingFetchConditions("Stock", "Crypto")):
            whatIsFetching = "stockToCrypto"
            break;

        case (checkingFetchConditions("Stock")):
            whatIsFetching = "stockToStock"
            break;


        default:
            break;
    }

    copyFetchData(fetchedData, setFetchedData, fetchCopy)
    copyFetchData(fetchedData2, setFetchedData2, fetch2Copy)

    return (
        <>
            {console.log("fetchCopy " + JSON.stringify(fetchCopy))}
            {console.log("fetch2Copy " + JSON.stringify(fetch2Copy))}
            {console.log("option1" + JSON.stringify(option1))}
            {console.log("option2 " + JSON.stringify(option2))}
            {console.log("fetchData " + fetchedData)}
            {console.log("fetchData2 " + fetchedData2)}

            {
                checkingRenderConditions() && <DisplayData
                    onIsLoading={isLoading}
                    onOption1={option1}
                    onOption2={option2}
                    onFetchCopy={fetchCopy}
                    onFetch2Copy={fetch2Copy}
                    onWhatIsFetching={whatIsFetching}
                    onInvert={props.invert}
                    onSetInvert={props.setInvert}
                    onFirstFormButtonSelection={props.onFirstFormButtonSelection}
                    onSecoundFormButtonSelection={props.onSecoundFormButtonSelection}
                    
                />
            }
            {/* <div className="invert" onClick={handleInvert}>
                <img src={invertIMG} alt="invert button" />
            </div> */}
        </>
    )
}       
