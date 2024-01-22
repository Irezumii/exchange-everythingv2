import { useEffect, useState } from "react"
import addIMG from '../../assets/add.png'
import cleanFetchedData from '../../../functions/cleanFetchedData'
import invertIMG from '../../assets/invert.png'
import { roundExchange } from "../../../functions/RoundExchange"

export default function DisplayData({ onIsLoading, onOption1, onOption2, onFetchCopy, onFetch2Copy, onWhatIsFetching, onAmount, onSetFavorites, onFavorites, invertingTrigger, onFirstFormBoxRef, onSecoundFormBoxRef, invert, setInvert }) {
    console.log("=======Display-data is rerendering ======================")

    // const [invert, setInvert] = useState(false)

    const cleanData = cleanFetchedData(onWhatIsFetching, onFetchCopy.current, onFetch2Copy.current, onAmount, invert, onOption1, onOption2)
    if (cleanData && cleanData.exchange) {
        cleanData.exchange = roundExchange(cleanData.exchange)
    }


    useEffect(function () {
        if (invertingTrigger === false) {
            setInvert(false)
        } else {
            setInvert(true)
        }
    }, [invertingTrigger])

    useEffect(function () {
        if (invert === false) {
            // onFirstFormBoxRef.current.style.borderRadius = "20px 0 0 20px"
            onFirstFormBoxRef.current.style.order = "0"
            // onSecoundFormBoxRef.current.style.borderRadius = "0 20px 20px 0"
        } else {
            // onFirstFormBoxRef.current.style.borderRadius = "0 20px 20px 0"
            onFirstFormBoxRef.current.style.order = "2"
            // onSecoundFormBoxRef.current.style.borderRadius = "20px 0 0 20px"
        }
    }, [invert])

    function handleAdd() {
        if (onFavorites === null) {
            onSetFavorites([cleanData])
        } else {
            const newFavorites = [...onFavorites, cleanData]
            onSetFavorites(newFavorites)
        }
    }

    function handleInvert() {
        // if (invert === true) {
        //     onFirstFormBoxRef.current.style.borderRadius = "20px 0 0 20px"
        //     onFirstFormBoxRef.current.style.order = "2"
        //     console.log("invert is" , invert ,"setting False")
        //     onSecoundFormBoxRef.current.style.borderRadius = "0 20px 20px 0"
        //     setInvert(false)
        // } else {
        //     onFirstFormBoxRef.current.style.borderRadius = "0 20px 20px 0"
        //     onFirstFormBoxRef.current.style.order = "0"
        //     console.log("invert is" , invert ,"setting true")
        //     onSecoundFormBoxRef.current.style.borderRadius = "20px 0 0 20px"
        //     setInvert(true)
        // }
        setInvert(!invert)
    }

    return (
        <>
            <div className="invert" onClick={handleInvert}>
                <img src={invertIMG} alt="invert button" />
            </div>
            {
                onIsLoading === false ?
                    <div className="result">{
                        cleanData && cleanData !== null && cleanData !== false ?
                            typeof (cleanData) === "object" ?
                                cleanData.amount + " " + cleanData.name + " = " + cleanData.exchange + " " + cleanData.name2
                                : cleanData
                            : null
                    }</div>
                    : <div className="result">Loading...</div>
            }
            {onIsLoading === false ? <img src={addIMG} className="add-img" onClick={handleAdd} alt="" /> : null}
        </>
    )

}