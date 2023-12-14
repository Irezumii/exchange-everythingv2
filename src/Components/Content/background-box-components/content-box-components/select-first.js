import React, { useState } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/crypto-forex-names'
import { money } from '../../../../data/forex-names';
import StockSearch from '../../../../Fetch/stock-search';


export default function MyFirstSelect(props) {

    const [tempSearchState, setTempSearchState] = useState(null)

    const keysCrypto = Object.keys(crypto)
    const keysForex = Object.keys(money)
    let stockTrue = false

    const handleChange = (option) => {
        // props.onSetCryptoExchangeTarget(null)
        props.onSetSelectedCrypto(null)

        props.onSetFirstSelectedOption(option);
        option && props.onSetItemImage(option.image);
        option.forexValue && props.onSetCryptoExchangeTarget(option.forexValue)
        option.cryptoValue && props.onSetSelectedCrypto(option.cryptoValue)
        console.log("")
        console.log("-----------------select-first.js")
        console.log("change" + JSON.stringify(option))
        console.log(option.cryptoValue + " option.cryptoValue")
        console.log(option.forexValue + " option.forexValue")
        console.log("-----------------select-first.js")
        console.log("")
    };
    const handleInputChange = (option) => {
        props.onSetInputFirstChange(option)
    }
    if (props.onFormButtonSelection === "Crypto") {
        stockTrue = false
        return (
            <Select
                className="first-input-text"
                value={props.onFirstSelectedOption}
                onChange={handleChange}
                options={keysCrypto.map((item) => {
                    return { value: crypto[item].symbol ,cryptoValue: crypto[item].symbol, label: crypto[item].name_full, image: crypto[item].icon_url }
                })}
                isClearable
                isSearchable
                placeholder="Wyszukaj Kryptowalutę..."
            />
        )
    } else if (props.onFormButtonSelection === "Forex") {
        stockTrue = false
        return (<Select
            className="first-input-text"
            value={props.onFirstSelectedOption}
            onChange={handleChange}
            options={keysForex.map((item, index) => {
                return { value: item, forexValue: item, label: item + "--" + money[item] }
            })}
            isClearable
            isSearchable
            placeholder="Wyszukaj Walutę..."
        />)
    } else if (props.onFormButtonSelection === "Stock") {
        stockTrue = true
        return (

            <>
                <Select
                    className="first-input-text"
                    value={props.onFirstSelectedOption}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={tempSearchState && tempSearchState.map((item, index) => {
                        return { value: item.Code, myValuePlace:item.Exchange ,country: item.Country,currency: item.Currency, label: item.Code + "--" + item.Name + " " + item.Country}
                    })}
                    isClearable
                    isSearchable
                    placeholder="Wyszukaj Rynek..."
                />
                {stockTrue && <StockSearch 
                onInputFirstChange={props.onInputFirstChange} 
                onSetInputFirstChange={props.onSetInputFirstChange}
                onSetTempSearchState={setTempSearchState}
                />}
            </>

        )
    }
};
