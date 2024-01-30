import { useState, useEffect, useRef } from "react"
import { useFetch } from "../../../hooks/useFetch";
import { optionsAssign } from "../../../functions/optionsAssign";
import DisplayData from "../Result-Components/DisplayData";
import Favorites from "../Result-Components/Favorites";
import Amount from "../Result-Components/Amount";
import History from "../Result-Components/History";
import './result.css'


export default function Result(props) {
    console.log("==============result RRRRRRRRRRRRRRRRR is re-rendering====================")

    //Sets the selected options for downloading.
    const { option1, option2, invertingTrigger } = optionsAssign(props.onFirstSelectedOption, props.onSecoundSelectedOption, props.invertingOptions)

    //The state that operates the 'Favorites' table is connected to LocalStorage
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("listOfFavorites")))

    //The state that operates the 'History' table is connected to LocalStorage
    const [history, setHistory] = useState(JSON.parse(localStorage.getItem("listOfHistory")))

    const [amount, setAmount] = useState(1)
    const [invert, setInvert] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [historyTrigger, setHistoryTrigger] = useState(null)

    const fetchCopy = useRef(null)
    const fetch2Copy = useRef(null)

    // Updates the state from localStorage every time it changes.
    useEffect(function () {
        localStorage.setItem("listOfFavorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(function () {
        localStorage.setItem("listOfHistory", JSON.stringify(history))
    }, [history])

    useEffect(function () {
        props.onFirstSelectedOption !== null && props.onSecoundSelectedOption !== null && setIsLoading(true)
    }, [option1, option2])

    //fetching
    const {
        fetchedData,
        setFetchedData,
        fetchedData2,
        setFetchedData2,
    } = useFetch(setInvert, option1, option2, props.whatIsFetching, setIsLoading, setHistoryTrigger, historyTrigger)

    //Copying fetched data
    function copyFetchData(data, setData, dataCopy) {
        if (data !== null) {
            dataCopy.current = data
            setData(null)
        }
    }

    function checkingRenderConditions() {
        if (option1 && option2 && option1.value && option2.value && fetchCopy && fetchCopy.current) {
            return true
        } else return false
    }

    copyFetchData(fetchedData, setFetchedData, fetchCopy)
    copyFetchData(fetchedData2, setFetchedData2, fetch2Copy)

    return (
        <>
            <div className='box-for-amount'>
                <Amount
                    option1={option1}
                    option2={option2}
                    setAmount={setAmount}
                />
            </div>
            <div className="box-for-result">
                {
                    checkingRenderConditions() && <DisplayData
                        onIsLoading={isLoading}
                        onOption1={option1}
                        onOption2={option2}
                        onFetchCopy={fetchCopy}
                        onFetch2Copy={fetch2Copy}
                        onWhatIsFetching={props.whatIsFetching}
                        onAmount={amount}
                        onSetFavorites={setFavorites}
                        onFavorites={favorites}
                        onHistory={history}
                        onSetHistory={setHistory}
                        invertingTrigger={invertingTrigger}
                        invert={invert}
                        setInvert={setInvert}
                        onHistoryTrigger={historyTrigger}
                    />
                }
            </div>
            <Favorites
                onFavorites={favorites}
                onSetFavorites={setFavorites}
            />
            <History
                onHistory={history}
                onSetHistory={setHistory}
                onOption1={option1}
                onOption2={option2}
                onHistoryTrigger={historyTrigger}
            />
        </>
    )
}       
