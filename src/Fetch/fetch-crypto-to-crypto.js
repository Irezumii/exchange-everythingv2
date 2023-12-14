import { useEffect } from "react";
import { coinLayerKey } from "../accesKeys/accesKeys";

export default function FetchCryptoToCrypto(props) {


    const link1 = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${props.onFirstSelectedOption.cryptoValue}&target=USD`;
    const link2 = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${props.onSecoundSelectedOption.cryptoValue}&target=USD`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData1 = async () => {
            try {
                const response = await fetch(link1, { signal });
                const data = await response.json();
                props.onSetCryptoFirstApiValue(data)

                console.log("")
                console.log("first fetch-crypto-to-crypto.js--------------------------")
                console.log("Fetched Data " +JSON.stringify(data))
                console.log("first fetch-crypto-to-crypto.js--------------------------")
                console.log("")

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };


        const fetchData2 = async () => {
            try {
                const response = await fetch(link2, { signal });
                const data = await response.json();
                props.onSetCryptoSecoundApiValue(data)

                console.log("")
                console.log("secound fetch-crypto-to-crypto.js--------------------------")
                console.log("Fetched Data " +JSON.stringify(data))
                console.log("secound fetch-crypto-to-crypto.js--------------------------")
                console.log("")

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData1();
        fetchData2();

        return () => {
            controller.abort();
        };
    }, [props.onFirstSelectedOption.cryptoValue, props.onSecoundSelectedOption.cryptoValue]);

    return null;
}