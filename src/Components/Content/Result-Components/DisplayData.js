import { useEffect, useState } from "react"
import addIMG from '../../assets/add.png'
import cleanFetchedData from '../../../functions/cleanFetchedData'
import invertIMG from '../../assets/invert.png'
import { roundExchange } from "../../../functions/RoundExchange"
import './DisplayData.css'

export default function DisplayData({ onIsLoading, onOption1, onOption2, onFetchCopy, onFetch2Copy, onWhatIsFetching, onAmount, onSetFavorites, onFavorites, invertingTrigger, invert, setInvert, onHistory, onSetHistory, onHistoryTrigger }) {
    console.log("=======Display-data is rerendering ======================")

    //Calculations based on retrieved data returning an object with ready-to-use data.
    const cleanData = cleanFetchedData(onWhatIsFetching, onFetchCopy.current, onFetch2Copy.current, onAmount, invert, onOption1, onOption2)
    if (cleanData && cleanData.exchange) {
        cleanData.exchange = roundExchange(cleanData.exchange)
    }

//Depending on the order of selected options, the function sets the 'Invert' 
//(the order of fetching options is predetermined, so if the values are swapped, they need to be inverted).
    useEffect(function () {
        if (invertingTrigger === false) {
            setInvert(false)
        } else {
            setInvert(true)
        }
    }, [invertingTrigger])

//Updating "Favorites" array 
    function handleAdd() {
        if (onFavorites === null) {
            onSetFavorites([cleanData])
        } else {
            const newFavorites = [...onFavorites, cleanData]
            onSetFavorites(newFavorites)
        }
    }

    // Updating "History" array
    useEffect(function () {
        if (onHistoryTrigger !== null) {
            if (cleanData && cleanData.exchange && !isNaN(cleanData.exchange) && typeof(cleanData) === "object" && cleanData !== undefined) {
                if (onHistory === null) {
                    onSetHistory([cleanData])
                } else {
                    const newHistory = [...onHistory, cleanData]
                    onSetHistory(newHistory)
                }
            }
        }
    }, [onHistoryTrigger])

    function handleInvert() {
        setInvert(!invert)
    }

    return (
        <>
            <div className="invert" onClick={handleInvert}>
                <img src={invertIMG} className="invert-img" alt="invert button" />
            </div>
            {
                onIsLoading === false ?
                    <div className="result">{
                        cleanData && cleanData !== null && cleanData !== false ?
                            typeof (cleanData) === "object" ?
                                cleanData.amount + " :" + cleanData.name + " = " + cleanData.exchange + " :" + cleanData.name2
                                : cleanData
                            : null
                    }</div>
                    : <div className="result">Loading...</div>
            }
            {onIsLoading === false ? <img src={addIMG} className="add-img" onClick={handleAdd} alt="" /> : null}
        </>
    )

}