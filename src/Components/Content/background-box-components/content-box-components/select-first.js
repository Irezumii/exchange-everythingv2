import React, { useState } from 'react';
import Select from 'react-select';
import { crypto } from '../../../../data/crypto-forex-names'



export default function MyFirstSelect() {
    const keys = Object.keys(crypto)
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);

    const handleChange = (option) => {
        setFirstSelectedOption(option);
    };

    return (
        <Select
            className="first-input-text"
            value={firstSelectedOption}
            onChange={handleChange}
            options={keys.map((item) => {
                return { value: crypto[item].symbol, label: crypto[item].name_full }
            })}
            isClearable
            isSearchable
            placeholder="Wyszukaj Pierwszy..."
        />
    );
};
