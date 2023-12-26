import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/crypto-forex-names'
import { money } from '../../../../data/forex-names';
import StockSearch from '../../../../Fetch/stock-search';


export default function MyFirstSelect(props) {
    console.log("=======select first is rerendering ======================")


    const [tempSearchState, setTempSearchState] = useState([])
    const clearingRef = useRef("")


    const handleChange = (option) => {
        props.onSetFirstSelectedOption(option);
        // option && props.onSetItemImage(option.image);
    }

    const handleInputChange = (option) => {
        props.onSetInputFirstChange(option)
    }
    function clearing(el) {
        if (clearingRef.current !== el) {
            props.onSetFirstSelectedOption(null)
            clearingRef.current = el
        }
    }

    if (props.onFormButtonSelection === "Crypto") {
        clearing("Crypto")

        return (
            <Select
                className="first-input-text"
                value={props.onFirstSelectedOption}
                onChange={handleChange}
                options={Object.keys(crypto).map((item) => {
                    return { value: crypto[item].symbol, label: crypto[item].name_full, image: crypto[item].icon_url }
                })}
                isClearable
                isSearchable
                placeholder="Wyszukaj Kryptowalutę..."
            />
        )
    } else if (props.onFormButtonSelection === "Forex") {
        clearing("Forex")

        return (<Select
            className="first-input-text"
            value={props.onFirstSelectedOption}
            onChange={handleChange}
            options={Object.keys(money).map((item, index) => {
                return { value: item, label: item + "--" + money[item] }
            })}
            isClearable
            isSearchable
            placeholder="Wyszukaj Walutę..."
        />)
    } else if (props.onFormButtonSelection === "Stock") {
        clearing("Stock")

        return (

            <>
                {console.log("tempSearchState " + tempSearchState + "typeof " + typeof (tempSearchState))}
                <Select
                    className="first-input-text"
                    value={props.onFirstSelectedOption}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={tempSearchState.map((item, index) => {
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
