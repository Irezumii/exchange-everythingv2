import { eodhdKey } from "../accesKeys/accesKeys";
import { useEffect } from "react";

export default function FetchStockToForex(props) {
    const temp = props.onFirstSelectedOption
    // const link = `https://eodhd.com/api/search/${searchString}?api_token=${eodhdKey}&fmt=json`;
    const link = `https://eodhd.com/api/real-time/${temp.value}.${temp.myValuePlace}?s=${temp.currency}${props.onSecoundSelectedOption.value}.FOREX&api_token=${eodhdKey}&fmt=json`
    // const link = `https://eodhd.com/api/real-time/AAPL.US?s=USDEUR.FOREX&api_token=6583950fd44fa6.36289051&fmt=json`

    useEffect(() => {
        props.onSetIsLoading(true)
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const response = await fetch(link, { signal });
                const data = await response.json();
                props.onSetStockToForexEndpoint(data)

                console.log('')
                console.log("stocktoforex.js --------------------")
                console.log(JSON.stringify(data))
                console.log("stocktoforex.js --------------------")
                console.log('')

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                    console.log(temp.value + " temp.value")
                    console.log(temp.myValuePlace + " temp.myValuePlace")
                    console.log(temp.currency + " temp.currency")
                    console.log(props.onSecoundSelectedOption.value + " props.onSecoundSelectedOption.value")
                }
            } finally {
                props.onSetIsLoading(false)
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [props.onFirstSelectedOption, props.onSecoundSelectedOption]);

    return null;
}
