
import { useState, useEffect, useRef } from "react"
import { useFetch } from "../hooks/useFetch";
import DisplayData from "./Content/Result-Components/DisplayData";
import Favorites from "./Content/Result-Components/Favorites";
import whatAndWhatOrder from "../functions/whatAndWhatOrder";
import cleanFetchedData from "../functions/cleanFetchedData";

export default function Result(props) {
    console.log("==============result RRRRRRRRRRRRRRRRR is re-rendering====================")

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("listOfFavorites")))

    const fetchCopy = useRef(null)
    const fetch2Copy = useRef(null)

    useEffect(function () {
        localStorage.setItem("listOfFavorites", JSON.stringify(favorites))
    }, [favorites])

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

    useEffect(function () {
        setFetchingFrom(whatIsFetching)
        setSelectedFirstOption(option1)
        setSelectedSecoundOption(option2)
        props.onFirstSelectedOption !== null && props.onSecoundSelectedOption !== null && setIsLoading(true)
    }, [props.onFirstSelectedOption, props.onSecoundSelectedOption])

    const form1 = props.onFirstFormButtonSelection
    const form2 = props.onSecoundFormButtonSelection

    const { whatIsFetching, option1, option2 } = whatAndWhatOrder(props.onFirstSelectedOption, props.onSecoundSelectedOption, form1, form2)
    
    
    copyFetchData(fetchedData, setFetchedData, fetchCopy)
    copyFetchData(fetchedData2, setFetchedData2, fetch2Copy)
    

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

    return (
        <>
            <div className="box-for-result">
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
                        onSetFavorites={setFavorites}
                        onAmount={props.onAmount}
                        onFavorites={favorites}
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
