import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/CryptoForexNames'
import { money } from '../../../../data/ForexNames';
import StockSearch from '../../../../Fetch/StockSearch';


export default function MyFirstSelect(props) {
    console.log("=======select first is rerendering ======================")

    const [tempSearchState, setTempSearchState] = useState([])
    const clearingRef = useRef("")

    const form = props.onFormButtonSelection
    const option1 = props.onFirstSelectedOption

    const handleChange = (option) => {
        props.onSetFirstSelectedOption(option);
        // props.onSetFirstSelectedOption(option);
    }

    const handleInputChange = (option) => {
        props.onSetInputFirstChange(option)
        // props.onSetInputFirstChange(option)
    }

    function clearing(el) {
        if (clearingRef.current !== el) {
            props.onSetFirstSelectedOption(null)
            // props.onSetFirstSelectedOption(null)
            clearingRef.current = el
        }
    }

    if (form === "Crypto") {
        clearing("Crypto")

        return (
            <Select
                className="first-input-text"
                value={option1}
                // value={option1}
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

        return (<Select
            className="first-input-text"
            value={option1}
            // value={option1}
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
                    value={option1}
                    // value={option1}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={tempSearchState.map((item) => {
                        return { value: item.Code, myValuePlace: item.Exchange, country: item.Country, currency: item.Currency, label: item.Code + "--" + item.Name + " " + item.Country }
                    })}
                    isClearable
                    isSearchable
                    placeholder="Wyszukaj Rynek..."
                />
                {tempSearchState && <StockSearch
                    onInputChange={props.onInputChange}
                    onSetTempSearchState={setTempSearchState}
                />}
            </>

        )
    }
};
