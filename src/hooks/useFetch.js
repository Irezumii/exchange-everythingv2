import { useState, useEffect, useRef } from "react"
import { eodhdKeys, coinLayerKeys } from "../accesKeys/accesKeys";

export function useFetch(setInvert, selectedFirstOption, selectedSecoundOption, fetchingFrom, setIsLoading, setHistoryTrigger, historyTrigger) {
    const [fetchedData, setFetchedData] = useState(null)
    const [fetchedData2, setFetchedData2] = useState(null)
    const currentKeyEodhdIndex = useRef(0)
    const currentKeyCoinLayerIndex = useRef(0)

    // const keyTrigger = fetchingFrom === "forexToCrypto" || fetchingFrom === "cryptoToCrypto" ? coinLayerKeys : eodhdKeys;

    // const currentKeyEodhd = eodhdKeys[currentKeyEodhdIndex.current];
    // const currentKeyCoinLayer = coinLayerKeys[currentKeyCoinLayerIndex.current];
    // console.log(currentKeyEodhd, "currentKeyeodhd")
    // console.log(currentKeyEodhd, "currentKeyCoinLayer")
    // console.log(currentKeyEodhdIndex.current, "currentkeyindexeodhd")
    // console.log(currentKeyCoinLayerIndex.current, "currentkeyindexcoinlayer")

    let secoundFetching = false
    let link;

    //In some exchanges, it is necessary to retrieve data twice; this code block checks what is being exchanged and, if necessary, sets up the second fetch
    if (fetchingFrom === "cryptoToCrypto" || fetchingFrom === "stockToStock" || fetchingFrom === "stockToCrypto") {
        secoundFetching = true
    } else {
        secoundFetching = false
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        //Prevents an attempt to fetch data when all the data is not yet available
        if (selectedFirstOption === null || selectedSecoundOption === null || fetchingFrom === null) {
            controller.abort()
            return
        }

        //Assigning the 'link' to the currently exchange.
        const fetchData = async (settingStateFunction, fetchParameters, fetchSecoundTime) => {
            const keyTrigger = fetchingFrom === "forexToCrypto" || fetchingFrom === "cryptoToCrypto" || (fetchingFrom === "stockToCrypto" && fetchSecoundTime !== false) ? "coinLayer" : "eodhd";
            const currentKeyEodhd = eodhdKeys[currentKeyEodhdIndex.current];
            const currentKeyCoinLayer = coinLayerKeys[currentKeyCoinLayerIndex.current];
            console.log(currentKeyEodhd, "currentKeyeodhd")
            console.log(currentKeyEodhd, "currentKeyCoinLayer")
            console.log(currentKeyEodhdIndex.current, "currentkeyindexeodhd")
            console.log(currentKeyCoinLayerIndex.current, "currentkeyindexcoinlayer")
            switch (fetchingFrom) {
                case "forexToForex":
                    link = `https://eodhd.com/api/real-time/${selectedFirstOption.value}${selectedSecoundOption.value}.FOREX?order=d&api_token=${currentKeyEodhd}&fmt=json`;
                    break;
                case "forexToCrypto":
                    link = `https://api.coinlayer.com/live?access_key=${currentKeyCoinLayer}&symbols=${selectedSecoundOption.value}&target=${selectedFirstOption.value}`;
                    break;
                case "cryptoToCrypto":
                    link = `https://api.coinlayer.com/live?access_key=${currentKeyCoinLayer}&symbols=${fetchParameters.value}&target=USD`;
                    break;
                case "stockToForex":
                    link = `https://eodhd.com/api/real-time/${selectedFirstOption.value}.${selectedFirstOption.myValuePlace}?s=${selectedFirstOption.currency}${selectedSecoundOption.value}.FOREX&api_token=${currentKeyEodhd}&fmt=json`
                    break;
                case "stockToCrypto":
                    fetchSecoundTime === false ?
                        link = `https://eodhd.com/api/real-time/${fetchParameters.value}.${fetchParameters.myValuePlace}?s=${fetchParameters.currency}USD.FOREX&api_token=${currentKeyEodhd}&fmt=json`
                        : link = `https://api.coinlayer.com/live?access_key=${currentKeyCoinLayer}&symbols=${fetchParameters.value}&target=USD`
                    break
                case "stockToStock":
                    link = `https://eodhd.com/api/real-time/${fetchParameters.value}.${fetchParameters.myValuePlace}?s=${fetchParameters.currency}USD.FOREX&api_token=${currentKeyEodhd}&fmt=json`
                    break

                default: if (fetchingFrom === null || fetchingFrom === undefined) {
                    console.log("nothing too see yet")
                    break
                } else {
                    throw new Error("Unexpected case")
                }
            }
            try {
                console.log(`------------------------------fetching ${fetchSecoundTime ? "Secound Time" : "First Time"}---------------------------`)
                const response = await fetch(link, { signal });
                const data = await response.json();
                settingStateFunction(data);
                console.log(data)

                console.log(data, "syncData.current")
                console.log(data.success, "syncData.current.success")
                if (data.success === false) {
                    console.log("warunkowe w przepisywaniu klucza wykonane ")
                    if (keyTrigger === "coinLayer") {
                        if (currentKeyCoinLayerIndex.current < coinLayerKeys.length - 1) {
                            console.log("mounting next CoinLayer acces key")
                            currentKeyCoinLayerIndex.current++
                            startFetch()
                            return
                        } else {
                            console.error("Limit kluczy API dla CoinLayer został wykorzystany")
                            // currentKeyCoinLayerIndex.current = coinLayerKeys.length - 1
                        }
                    }
                    //  else if (keyTrigger === "eodhd") {
                    //     if (currentKeyEodhdIndex.current <= eodhdKeys.length - 1) {
                    //         console.log("mounting next eodhd acces key")
                    //         currentKeyEodhdIndex.current++
                    //         startFetch()
                    //         return
                    //     } else {
                    //         console.error("Limit kluczy API dla EodHD został wykorzystany")
                    //         currentKeyEodhdIndex.current = eodhdKeys.length - 1
                    //     }
                    // }
                }
                return data
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else if (error.name === "TypeError") {
                    if (keyTrigger === "eodhd") {
                        if (currentKeyEodhdIndex.current < eodhdKeys.length - 1) {
                            console.log("mounting next eodhd acces key")
                            currentKeyEodhdIndex.current++
                            startFetch()
                            // return
                        } else {
                            console.error("Limit kluczy API dla EodHD został wykorzystany")
                            throw error;
                            // currentKeyEodhdIndex.current = eodhdKeys.length - 1
                        }
                    }
                }
                else {
                    console.log(typeof (error.name), "error.name")
                    console.error('Error fetching data:', error);
                }
            } finally {
                setInvert(false)
            }
        };

        //Calling functions / setting up the loading screen and trigger for the 'History' Component to set data.
        async function startFetch() {
            const temp1 = await fetchData(setFetchedData, selectedFirstOption, false);
            let temp2;
            if (secoundFetching !== false) {
                temp2 = await fetchData(setFetchedData2, selectedSecoundOption, true);
            }

            if ((secoundFetching === false && temp1) || (secoundFetching !== false && temp1 && temp2)) {
                setIsLoading(false)
                if (historyTrigger === null) {
                    setHistoryTrigger(false)
                } else {
                    setHistoryTrigger(!historyTrigger)
                }
            }
        }
        startFetch()

        //Cleaning function
        return () => {
            setFetchedData(null)
            setFetchedData2(null)
        };
    }, [selectedSecoundOption, selectedFirstOption]);

    return { fetchedData, setFetchedData, fetchedData2, setFetchedData2, fetchingFrom }
}
