import { useEffect } from "react"
import addIMG from '../../assets/add.png'
import cleanFetchedData from '../../../functions/cleanFetchedData'

export default function DisplayData({ onIsLoading, onOption1, onOption2, onFetchCopy, onFetch2Copy, onWhatIsFetching, onInvert, onSetInvert, onSecoundFormButtonSelection, onFirstFormButtonSelection, onAmount, onSetFavorites, onFavorites }) {
    console.log("=======Display-data is rerendering ======================")

    const form = onFirstFormButtonSelection
    const form2 = onSecoundFormButtonSelection

    const code = onOption1.value
    const code2 = onOption2.value

    const fetch = onFetchCopy.current
    const fetch2 = onFetch2Copy.current

    const cleanData = cleanFetchedData(onWhatIsFetching, code, code2, fetch, fetch2, onAmount, onInvert, onFirstFormButtonSelection, onSecoundFormButtonSelection, onOption1, onOption2)
    console.log("clean data" + JSON.stringify(cleanData))

    useEffect(function () {
        if ((form === "Crypto" && form2 === "Forex") ||
            (form === "Crypto" && form2 === "Stock") ||
            (form === "Forex" && form2 === "Stock")) {
            if (onInvert === false) {
                onSetInvert(true)
            }
        } else {
            if (onInvert === true) {
                onSetInvert(false)
            }
        }
    }, [form, form2, onOption1, onOption2])

    function handleAdd() {
        const newFavorites = [...onFavorites, cleanData]
        onSetFavorites(newFavorites)
    }

    return (
        <>
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