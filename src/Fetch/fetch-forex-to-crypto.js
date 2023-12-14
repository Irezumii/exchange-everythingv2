import { useEffect } from "react";
import { coinLayerKey } from "../accesKeys/accesKeys";

export default function FetchForexToCrypto(props) {
    let moneyTarget = props.onCryptoExchangeTarget && `&target=${props.onCryptoExchangeTarget}`;
    let cryptoTarget;

    if (props.onSelectedCrypto1) {
        cryptoTarget = props.onSelectedCrypto1;
    } else if (props.onSelectedCrypto2) {
        cryptoTarget = props.onSelectedCrypto2;
    }

    const link = `http://api.coinlayer.com/live?access_key=${coinLayerKey}&symbols=${cryptoTarget}${moneyTarget}`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const response = await fetch(link, { signal });
                const data = await response.json();

                props.onSetDisplayForexCrypto(data);
                console.log("fetching.." + JSON.stringify(data));
                props.onSetCryptoTarget(cryptoTarget);
                console.log("fetching-forex to crypto data");
                console.log(cryptoTarget + "cryptoTarget");
                console.log(moneyTarget + "moneyTarget");
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Żądanie zostało anulowane.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [link, props.onSelectedCrypto1, props.onSelectedCrypto2, props.onCryptoExchangeTarget]);

    return null;
}
