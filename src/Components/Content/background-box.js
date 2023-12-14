import Result from '../result'
import ContentBox from './background-box-components/content-box'
import MyFirstSelect from './background-box-components/content-box-components/select-first';
import MySecoundSelect from './background-box-components/content-box-components/select-secound';
import { useState } from 'react';

export default function BackgroundBox() {
    const [firstItemImage, setFirstItemImage] = useState(null)
    const [secoundItemImage, setSecoundItemImage] = useState(null)
    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);

    const [forexToForexState, setForexToForexState] = useState(null)

    const [inputFirstChange, setInputFirstChange] = useState(null)
    const [inputSecoundChange, setInputSecoundChange] = useState(null)

    const [cryptoExchangeTarget, setCryptoExchangeTarget] = useState(null)
    const [selectedCrypto1, setSelectedCrypto1] = useState(null)
    const [selectedCrypto2, setSelectedCrypto2] = useState(null)

    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <ContentBox
                style={{ borderRadius: "20px 0 0 20px" }}
                onMySelect={<MyFirstSelect
                    onSetItemImage={setFirstItemImage}
                    onFormButtonSelection={firstFormButtonSelection}
                    onFirstSelectedOption={firstSelectedOption}
                    onSetFirstSelectedOption={setFirstSelectedOption}

                    onInputFirstChange={inputFirstChange}
                    onSetInputFirstChange={setInputFirstChange}

                    onCryptoExchangeTarget={cryptoExchangeTarget}
                    onSetCryptoExchangeTarget={setCryptoExchangeTarget}

                    onSelectedCrypto={selectedCrypto1}
                    onSetSelectedCrypto={setSelectedCrypto1}
                />}
                onItemImage={firstItemImage}
                onFormButtonSelection={firstFormButtonSelection}
                onSetFormButtonSelection={setFirstFormButtonSelection}
                onSetSelectedOption={setFirstSelectedOption}
            />
            <ContentBox
                style={{ borderRadius: "0 20px 20px 0" }}
                onMySelect={<MySecoundSelect
                    onSetItemImage={setSecoundItemImage}
                    onFormButtonSelection={secoundFormButtonSelection}
                    onSecoundSelectedOption={secoundSelectedOption}
                    onSetSecoundSelectedOption={setSecoundSelectedOption}

                    onInputSecoundChange={inputSecoundChange}
                    onSetInputSecoundChange={setInputSecoundChange}

                    onCryptoExchangeTarget={cryptoExchangeTarget}
                    onSetCryptoExchangeTarget={setCryptoExchangeTarget} 

                    onSelectedCrypto={selectedCrypto2}
                    onSetSelectedCrypto={setSelectedCrypto2}
                    />}
                onItemImage={secoundItemImage}
                onFormButtonSelection={secoundFormButtonSelection}
                onSetFormButtonSelection={setSecoundFormButtonSelection}
                onSetSelectedOption={setSecoundSelectedOption}

            />
            <Result 
                onFirstFormButtonSelection={firstFormButtonSelection}
                onSecoundFormButtonSelection={secoundFormButtonSelection}
                
                onSecoundSelectedOption={secoundSelectedOption}
                onFirstSelectedOption={firstSelectedOption} 

                onForexToForexState={forexToForexState}
                onSetForexToForexState={setForexToForexState}

                onCryptoExchangeTarget={cryptoExchangeTarget}
                onSetCryptoExchangeTarget={setCryptoExchangeTarget}

                onSelectedCrypto1={selectedCrypto2}
                onSetSelectedCrypto1={setSelectedCrypto2}

                onSelectedCrypto2={selectedCrypto1}
                onSetSelectedCrypto2={setSelectedCrypto1}
            />
        </div>
    )
}