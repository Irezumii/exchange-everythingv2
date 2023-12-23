import { eodhdKey } from "../accesKeys/accesKeys";
import { useEffect } from "react";

export default function ForexToForexExchange(props) {
    const forex1 = props.onFirstSelectedOption.value;
    const forex2 = props.onSecoundSelectedOption.value;
    
    const link = `https://eodhd.com/api/real-time/${forex1}${forex2}.FOREX?order=d&api_token=${eodhdKey}&fmt=json`;
    
    useEffect(() => {
        
        props.onSetIsLoading(true)
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const response = await fetch(link, { signal });
                const data = await response.json();

                props.onSetForexToForexState(data);
                console.log("");
                console.log("forex-exchange.js----------------------");
                console.log("fetched data " + JSON.stringify(data));
                console.log("props.onFirstSelectedOption " + JSON.stringify(props.onFirstSelectedOption));
                console.log("props.onSecoundSelectedOption " + JSON.stringify(props.onSecoundSelectedOption));
                console.log("forex-exchange.js-----------------------");
                console.log("");
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                }
            } finally {
                props.onSetIsLoading(false)
            }
        };

        fetchData();

        return () => {
            controller.abort();
            props.onSetIsLoading(false)
        };
    }, [link, props.onFirstSelectedOption.value, props.onSecoundSelectedOption.value]);

    return null;
}
