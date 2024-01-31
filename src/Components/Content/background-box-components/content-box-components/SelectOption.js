import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/CryptoForexNames'
import { money } from '../../../../data/ForexNames';
import StockSearch  from './StockSearch'
import './SelectOption.css'


export default function SelectOption({ onFormButtonSelection, onSelectedOption, onSetSelectedOption, onSetInput, onInput }) {
    console.log("=======select first is rerendering ======================")

    const [tempSearchState, setTempSearchState] = useState([])
    const clearingRef = useRef("")
    const [inputDisplay, setInputDisplay] = useState(null)

    const form = onFormButtonSelection

    //clearing the input
    useEffect(() => {
        function clearing(el) {
            if (clearingRef.current !== el) {
                setInputDisplay(null)
                onSetSelectedOption(null)
                clearingRef.current = el
            }
        }

        if (form === "Crypto") {
            clearing("Crypto");
        } else if (form === "Forex") {
            clearing("Forex");
        } else if (form === "Stock") {
            clearing("Stock");
        }
    }, [form, onSetSelectedOption]);


    //Sets the selected option.
    const handleChange = (option) => {
        onSetSelectedOption(option);
        setInputDisplay(option)
    }

    //Monitors the text input window and dynamically searches for matching stocks.
    const handleInputChange = (option) => {
        onSetInput(option)
    }

    //Rendering the appropriate input based on the selected option
    if (form === "Crypto") {
        // clearing("Crypto")
        return (
            <Select
                className="first-input-text"
                value={inputDisplay}
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
        // clearing("Forex")

        return (<Select
            className="first-input-text"
            value={inputDisplay}
            onChange={handleChange}
            options={Object.keys(money).map((item) => {
                return { value: item, label: item + "--" + money[item] }
            })}
            isClearable
            isSearchable
            placeholder="Wyszukaj Walutę..."
        />)
    } else if (form === "Stock") {
        // clearing("Stock")

        return (
            <>
                <Select
                    className="first-input-text"
                    value={inputDisplay}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={tempSearchState.map((item) => {
                        return { value: item.Code, myValuePlace: item.Exchange, country: item.Country, currency: item.Currency, label: item.Code + "--" + item.Name + " " + item.Country }
                    })}
                    isClearable
                    isSearchable
                    placeholder="Wyszukaj Rynek..."
                />
                {/* Stock search engine. */}
                {tempSearchState && <StockSearch
                    onInputChange={onInput}
                    onSetTempSearchState={setTempSearchState}
                />}
            </>

        )
    }
};
