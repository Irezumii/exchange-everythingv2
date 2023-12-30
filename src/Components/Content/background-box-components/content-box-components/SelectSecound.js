import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/CryptoForexNames'
import { money } from '../../../../data/ForexNames';
import StockSearch from '../../../../Fetch/StockSearch';


export default function MySecoundSelect(props) {
    console.log("=======select secound is rerendering ======================")

    const [tempSearchState, setTempSearchState] = useState([])
    const clearingRef = useRef("")

    const form = props.onFormButtonSelection
    const option2 = props.onSecoundSelectedOption


    const handleChange = (option) => {
        props.onSetSecoundSelectedOption(option);
        // props.onSetSecoundSelectedOption(option);
    };

    const handleInputChange = (option) => {
        props.onSetInputSecoundChange(option)
        // props.onSetInputSecoundChange(option)
    }

    function clearing (el) {
        if (clearingRef.current !== el) {
            props.onSetSecoundSelectedOption(null)
            // props.onSetSecoundSelectedOption(null)
            clearingRef.current = el
        }
    }
    if (form === "Crypto") {
        clearing("Crypto")

        return (
            <Select
                className="first-input-text"
                value={option2}
                // value={option2}
                onChange={handleChange}
                options={Object.keys(crypto).map((item) => {
                    return { value: crypto[item].symbol, label: crypto[item].name_full, image: crypto[item].icon_url }
                })}
                isClearable
                isSearchable
                placeholder="Wyszukaj Kryptowalutę..."
            />
        )
    } else if (form === "Forex") {
        clearing("Forex")
        return (
            <Select
                className="first-input-text"
                value={option2}
                // value={option2}
                onChange={handleChange}
                options={Object.keys(money).map((item) => {
                    return { value: item, label: item + "--" + money[item] }
                })}
                isClearable
                isSearchable
                placeholder="Wyszukaj Walutę..."
            />)

    } else if (form === "Stock") {
        clearing("Stock")

        return (
            <>
                <Select
                    className="first-input-text"
                    value={option2}
                    // value={option2}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={tempSearchState.map((item) => {
                        return { value: item.Code, myValuePlace: item.Exchange, country: item.Country, currency: item.Currency, label: item.Code + "--" + item.Name + " " + item.Country }
                    })}
                    isClearable
                    isSearchable
                    placeholder="Wyszukaj Rynek..."
                />
                {tempSearchState &&
                    <StockSearch
                        onInputChange={props.onInputChange}
                        onSetTempSearchState={setTempSearchState}
                    />}
            </>
        )
    }
};
