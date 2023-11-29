import React, { useState } from 'react';
import Select from 'react-select';
// import { crypto } from '../../../../data/crypto-forex-names'
import { money } from '../../../../data/forex-names';



export default function MySecoundSelect() {
    const keys = Object.keys(money)
    const [SecoundSelectedOption, setSecoundSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSecoundSelectedOption(option);
    };

    return (
        <Select
            className="first-input-text"
            value={SecoundSelectedOption}
            onChange={handleChange}
            options={keys.map((item, index) => {
                return { value: item, label: item + "--" + money[item] }
            })}
            isClearable
            isSearchable
            placeholder="Wyszukaj Drugi..."
        />
    );
};
