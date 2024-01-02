import { useEffect, useState } from "react"
import addIMG from '../../assets/add.png'
import cleanFetchedData from '../../../functions/cleanFetchedData'
import invertIMG from '../../assets/invert.png'

export default function DisplayData({ onIsLoading, onOption1, onOption2, onFetchCopy, onFetch2Copy, onWhatIsFetching, onAmount, onSetFavorites, onFavorites,invertingTrigger }) {
    console.log("=======Display-data is rerendering ======================")

    const [invert, setInvert] = useState(false)

    const cleanData = cleanFetchedData(onWhatIsFetching, onOption1.value, onOption2.value, onFetchCopy.current, onFetch2Copy.current, onAmount, invert, onOption1, onOption2)

    console.log("CleanData ",JSON.stringify(cleanData))

    useEffect(function () {
        if (invertingTrigger === false) {
            setInvert(false)
        } else {
            setInvert(true)
        }
    }, [invertingTrigger])


    function handleAdd() {
        const newFavorites = [...onFavorites, cleanData]
        onSetFavorites(newFavorites)
    }

    function handleInvert() {
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