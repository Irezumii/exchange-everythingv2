import { useState, useEffect, useRef } from "react"
import { eodhdKey, coinLayerKey } from "../accesKeys/accesKeys";

export function useFetch() {
    const [fetchedData, setFetchedData] = useState(null)
    const [fetchedData2, setFetchedData2] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [fetchingFrom, setFetchingFrom] = useState(null)
    const [selectedFirstOption, setSelectedFirstOption] = useState(null)
    const [selectedSecoundOption, setSelectedSecoundOption] = useState(null)
    const [onlyOneOption, setOnlyOneOption] = useState(null)

    console.log("isLoading? " + isLoading)


    let secoundFetching = false


    if (fetchingFrom === "cryptoToCrypto" || fetchingFrom === "stockToStock" || fetchingFrom === "stockToCrypto" ){
        secoundFetching = true
    } else {
        secoundFetching = false
    }

    console.log()
    console.log("----------useFetch---------")
    console.log("setIsLoading " + setIsLoading)
    console.log("fetchingFrom " + fetchingFrom)
    console.log(" onlyOneOption " + onlyOneOption)
    console.log("----------useFetch---------")
    console.log()
    let link;

    useEffect(() => {
        setIsLoading(true)
        const controller = new AbortController();
        const signal = controller.signal;
        if (selectedFirstOption === null || selectedSecoundOption === null || fetchingFrom === null) {
            controller.abort()
        }

        const fetchData = async (element, DoubleFetchingElement, boolean) => {
            switch (fetchingFrom) {
                case "forexToForex":
                    link = `https://eodhd.com/api/real-time/${selectedFirstOption.value}${selectedSecoundOption.value}.FOREX?order=d&api_token=${eodhdKey}&fmt=json`;
                    break;
                case "forexToCrypto":
                    link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${selectedSecoundOption.value}&target=${selectedFirstOption.value}`;
                    break;
                case "cryptoToCrypto":
                    link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${DoubleFetchingElement.value}&target=USD`;
                    break;
                case "stockToForex":
                    link = `https://eodhd.com/api/real-time/${selectedFirstOption.value}.${selectedFirstOption.myValuePlace}?s=${selectedFirstOption.currency}${selectedSecoundOption.value}.FOREX&api_token=${eodhdKey}&fmt=json`
                    break;
                case "stockToCrypto":
                    boolean === false ?
                        link = `https://eodhd.com/api/real-time/${DoubleFetchingElement.value}.${DoubleFetchingElement.myValuePlace}?s=${DoubleFetchingElement.currency}USD.FOREX&api_token=${eodhdKey}&fmt=json`
                        : link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${DoubleFetchingElement.value}&target=USD`
                    break
                case "stockToStock":
                    link = `https://eodhd.com/api/real-time/${DoubleFetchingElement.value}.${DoubleFetchingElement.myValuePlace}?s=${DoubleFetchingElement.currency}USD.FOREX&api_token=${eodhdKey}&fmt=json`
                    break

                default: if (fetchingFrom === null || fetchingFrom === undefined) {
                    console.log("nothing too see yet")
                } else throw new Error("Unexpected case " + fetchingFrom)
            }
            try {
                setIsLoading(true)
                const response = await fetch(link, { signal });
                const data = await response.json();
                element(data);
                console.log("------------------------------fetching ---------------------------")
                console.log("isLoading? " + isLoading)
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                }
            } finally {
                setIsLoading(false)
                console.log("Link to fetching xxxxxxx " + link)
                console.log("isLoading? " + isLoading)
            }

        };

        async function startFetch() {
            await fetchData(setFetchedData, selectedFirstOption, false);
            if (secoundFetching !== false) {
                await fetchData(setFetchedData2, selectedSecoundOption, true);
            }
        }
        try{
            startFetch()
        } catch(error){
            console.log(error)
        } finally {
            setIsLoading(false)
        }
        console.log("isLoading? " + isLoading)

        return () => {
            // controller.abort();
            // setIsLoading(false)
            // setFetchingFrom(null)
            // setSelectedFirstOption(null)
            // setSelectedSecoundOption(null)
            // setOnlyOneOption(null)
            setFetchedData(null)
            setFetchedData2(null)
        };
    }, [selectedSecoundOption, selectedFirstOption]);


    console.log("fetchedData " + JSON.stringify(fetchedData))
    console.log("fetchedData2 " + JSON.stringify(fetchedData2))
    return { fetchedData, setFetchedData, fetchedData2, setFetchedData2, fetchingFrom, isLoading, setFetchingFrom, setSelectedFirstOption, setSelectedSecoundOption, setOnlyOneOption }
}

// const object = {
//     setIsLoading: null,
//     fetchingFrom: null,
//     selectedFirstOption: null,
//     selectedSecoundOption: null,
//     onlyOneOption: null,
//     fetchingFrom: null
// }