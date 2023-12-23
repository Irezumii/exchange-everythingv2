import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/crypto-forex-names'
import { money } from '../../../../data/forex-names';
import StockSearch from '../../../../Fetch/stock-search';



export default function MySecoundSelect(props) {

    const [tempSearchState, setTempSearchState] = useState([])
    const clearingRef = useRef("")


    const form = props.onFormButtonSelection
    const setInput = props.onSetInputSecoundChange


    const handleChange = (option) => {
        props.onSetSecoundSelectedOption(option);
        option && props.onSetItemImage(option.image);
    };

    const handleInputChange = (option) => {
        setInput(option)
        console.log(JSON.stringify(option) + " option")
    }

    console.log(form + " działa i zmienia mi Input")
    console.log(props.onInputChange)

    function clearing (el) {
        if (clearingRef.current !== el) {
            props.onSetSecoundSelectedOption(null)
            clearingRef.current = el
        }
    }
    if (form === "Crypto") {
        clearing("Crypto")
        return (
            <Select
                className="first-input-text"
                value={props.onSecoundSelectedOption}
                onChange={handleChange}
                options={Object.keys(crypto).map((item) => {
                    return { value: crypto[item].symbol, cryptoValue: crypto[item].symbol, label: crypto[item].name_full, image: crypto[item].icon_url }
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
                value={props.onSecoundSelectedOption}
                onChange={handleChange}
                options={Object.keys(money).map((item, index) => {
                    return { value: item, forexValue: item, label: item + "--" + money[item] }
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
                    value={props.onSecoundSelectedOption}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={tempSearchState.map((item, index) => {
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
