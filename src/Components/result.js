import { useState, useEffect, useRef} from "react"
import { useFetch } from "../hooks/useFetch";
import { optionsAssign } from "../functions/optionsAssign";
import DisplayData from "./Content/Result-Components/DisplayData";
import Favorites from "./Content/Result-Components/Favorites";
import Amount from "./Content/Result-Components/Amount";


export default function Result(props) {
    console.log("==============result RRRRRRRRRRRRRRRRR is re-rendering====================")

    const {option1, option2, invertingTrigger} = optionsAssign(props.onFirstSelectedOption, props.onSecoundSelectedOption, props.invertingOptions)

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("listOfFavorites")))
    const [amount, setAmount] = useState(1)

    const fetchCopy = useRef(null)
    const fetch2Copy = useRef(null)

    useEffect(function () {
        localStorage.setItem("listOfFavorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(function () {
        setFetchingFrom(props.whatIsFetching)
        setSelectedFirstOption(option1)
        setSelectedSecoundOption(option2)
        props.onFirstSelectedOption !== null && props.onSecoundSelectedOption !== null && setIsLoading(true)
    }, [option1, option2])

    const {
        fetchedData,
        setFetchedData,
        fetchedData2,
        setFetchedData2,
        isLoading,
        setIsLoading,
        setFetchingFrom,
        setSelectedFirstOption,
        setSelectedSecoundOption } = useFetch()

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
                        onSetFavorites={setFavorites}
                        onAmount={amount}
                        onFavorites={favorites}
                        invertingTrigger={invertingTrigger}
                    />
                }
            </div>
            <Favorites
                onFavorites={favorites}
                onSetFavorites={setFavorites}
            />
        </>
    )
}       
