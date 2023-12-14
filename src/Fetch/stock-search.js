import { eodhdKey } from "../accesKeys/accesKeys";
import { useEffect } from "react";

export default function StockSearch(props) {
    const searchString = props.onInputFirstChange;
    const link = `https://eodhd.com/api/search/${searchString}?api_token=${eodhdKey}&fmt=json`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const response = await fetch(link, { signal });
                const data = await response.json();
                props.onSetTempSearchState(data);
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
    }, [link, props]);

    return null;
}
