import React, { useState } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/crypto-forex-names'
import { money } from '../../../../data/forex-names';
import StockSearch from '../../../../Fetch/stock-search';



export default function MySecoundSelect(props) {

    const [tempSearchState, setTempSearchState] = useState(null)

    const keysCrypto = Object.keys(crypto)
    const keysForex = Object.keys(money)
    let stockTrue = false

    const handleChange = (option) => {
        // props.onSetCryptoExchangeTarget(null)
        props.onSetSelectedCrypto(null)

        props.onSetSecoundSelectedOption(option);
        option && props.onSetItemImage(option.image);
        option.forexValue && props.onSetCryptoExchangeTarget(option.forexValue)
        option.cryptoValue && props.onSetSelectedCrypto(option.cryptoValue)

        console.log("")
        console.log("-----------------select-secound.js")
        console.log("change2" + JSON.stringify(option))
        console.log("changecryptoValue " + option.cryptoValue)
        console.log("changeforexValue " + option.forexValue)
        console.log("-----------------select-secound.js")
        console.log("")
    };
    const handleInputChange = (option) => {
        props.onSetInputSecoundChange(option)
    }

    if (props.onFormButtonSelection === "Crypto") {
        stockTrue = false
        return (
            <Select
                className="first-input-text"
                value={props.onSecoundSelectedOption}
                onChange={handleChange}
                options={keysCrypto.map((item) => {
                    return { value: crypto[item].symbol,cryptoValue: crypto[item].symbol, label: crypto[item].name_full, image: crypto[item].icon_url }
                })}
                isClearable
                isSearchable
                placeholder="Wyszukaj Kryptowalutę..."
            />
        )
    } else if (props.onFormButtonSelection === "Forex") {
        stockTrue = false
        return (
            <Select
                className="first-input-text"
                value={props.onSecoundSelectedOption}
                onChange={handleChange}
                options={keysForex.map((item, index) => {
                    return { value: item,forexValue: item, label: item + "--" + money[item] }
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
                    value={props.onSecoundSelectedOption}
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
                onInputFirstChange={props.onInputSecoundChange} 
                onSetInputSecoundChange={props.onSetInputSecoundChange}
                onSetTempSearchState={setTempSearchState}
                />}
            </>
            )
        }
};
