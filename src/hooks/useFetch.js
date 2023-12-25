import { useState, useEffect } from "react"
import { eodhdKey, coinLayerKey } from "../accesKeys/accesKeys";

export function useFetch() {
    const [fetchedData, setFetchedData] = useState(null)
    const [fetchedData2, setFetchedData2] = useState(null)
    const [fetchingFrom, setFetchingFrom] = useState(null)
    const [selectedFirstOption, setSelectedFirstOption] = useState(null)
    const [selectedSecoundOption, setSelectedSecoundOption] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    let secoundFetching = false
    let link;


    if (fetchingFrom === "cryptoToCrypto" || fetchingFrom === "stockToStock" || fetchingFrom === "stockToCrypto") {
        secoundFetching = true
    } else {
        secoundFetching = false
    }


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (selectedFirstOption === null || selectedSecoundOption === null || fetchingFrom === null) {
            controller.abort()
            return
        }

        const fetchData = async (settingStateFunction, fetchParameters, fetchSecoundTime) => {
            switch (fetchingFrom) {
                case "forexToForex":
                    link = `https://eodhd.com/api/real-time/${selectedFirstOption.value}${selectedSecoundOption.value}.FOREX?order=d&api_token=${eodhdKey}&fmt=json`;
                    break;
                case "forexToCrypto":
                    link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${selectedSecoundOption.value}&target=${selectedFirstOption.value}`;
                    break;
                case "cryptoToCrypto":
                    link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${fetchParameters.value}&target=USD`;
                    break;
                case "stockToForex":
                    link = `https://eodhd.com/api/real-time/${selectedFirstOption.value}.${selectedFirstOption.myValuePlace}?s=${selectedFirstOption.currency}${selectedSecoundOption.value}.FOREX&api_token=${eodhdKey}&fmt=json`
                    break;
                case "stockToCrypto":
                    fetchSecoundTime === false ?
                        link = `https://eodhd.com/api/real-time/${fetchParameters.value}.${fetchParameters.myValuePlace}?s=${fetchParameters.currency}USD.FOREX&api_token=${eodhdKey}&fmt=json`
                        : link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${fetchParameters.value}&target=USD`
                    break
                case "stockToStock":
                    link = `https://eodhd.com/api/real-time/${fetchParameters.value}.${fetchParameters.myValuePlace}?s=${fetchParameters.currency}USD.FOREX&api_token=${eodhdKey}&fmt=json`
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
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }

        };

        async function startFetch() {
            await fetchData(setFetchedData, selectedFirstOption, false);
            if (secoundFetching !== false) {
                await fetchData(setFetchedData2, selectedSecoundOption, true);
            }
            setIsLoading(false)
        }
        startFetch()

        return () => {
            setFetchedData(null)
            setFetchedData2(null)
        };
    }, [selectedSecoundOption, selectedFirstOption]);

    return { fetchedData, setFetchedData, fetchedData2, setFetchedData2, fetchingFrom ,setFetchingFrom, setSelectedFirstOption, setSelectedSecoundOption, isLoading, setIsLoading }
}
