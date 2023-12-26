import Result from '../result'
import ContentBox from './background-box-components/content-box'
import MyFirstSelect from './background-box-components/content-box-components/select-first';
import MySecoundSelect from './background-box-components/content-box-components/select-secound';
import { useState } from 'react';
import  invertIMG  from '../assets/invert.png'

export default function BackgroundBox() {

    console.log("=======background-box is rednering ==============")

    // const [firstItemImage, setFirstItemImage] = useState(null)
    // const [secoundItemImage, setSecoundItemImage] = useState(null)
    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);
    const [invert, setInvert] = useState(false)


    const [inputFirstChange, setInputFirstChange] = useState(null)
    const [inputSecoundChange, setInputSecoundChange] = useState(null)

    function handleInvert() {
        setInvert(!invert)
    }

    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <div className='box-for-amount'></div>
            <div className='box-for-content-box'>
                <ContentBox
                    style={{ borderRadius: "20px 0 0 20px" }}
                    onMySelect={<MyFirstSelect
                        // onSetItemImage={setFirstItemImage}
                        onFormButtonSelection={firstFormButtonSelection}
                        onFirstSelectedOption={firstSelectedOption}
                        onSetFirstSelectedOption={setFirstSelectedOption}

                        onInputChange={inputFirstChange}
                        onSetInputFirstChange={setInputFirstChange}

                    />}
                    // onItemImage={firstItemImage}
                    onFormButtonSelection={firstFormButtonSelection}
                    onSetFormButtonSelection={setFirstFormButtonSelection}
                    onSetSelectedOption={setFirstSelectedOption}
                />
                <ContentBox
                    style={{ borderRadius: "0 20px 20px 0" }}
                    onMySelect={<MySecoundSelect
                        // onSetItemImage={setSecoundItemImage}
                        onFormButtonSelection={secoundFormButtonSelection}
                        onSecoundSelectedOption={secoundSelectedOption}
                        onSetSecoundSelectedOption={setSecoundSelectedOption}

                        onInputChange={inputSecoundChange}
                        onSetInputSecoundChange={setInputSecoundChange}

                    />}
                    // onItemImage={secoundItemImage}
                    onFormButtonSelection={secoundFormButtonSelection}
                    onSetFormButtonSelection={setSecoundFormButtonSelection}
                    onSetSelectedOption={setSecoundSelectedOption}

                />
                <div className="invert" onClick={handleInvert}>
                    <img src={invertIMG} alt="invert button" />
                </div>
            </div>
            <div className='box-for-result'>
                <Result
                    onFirstFormButtonSelection={firstFormButtonSelection}
                    onSecoundFormButtonSelection={secoundFormButtonSelection}

                    onSecoundSelectedOption={secoundSelectedOption}
                    onFirstSelectedOption={firstSelectedOption}

                    invert={invert}
                    setInvert={setInvert}

                // onInputChange={inputFirstChange} 
                // onSetInputFirstChange={setInputFirstChange}

                // onInputSecoundChange={inputSecoundChange} 
                // onSetInputSecoundChange={setInputSecoundChange}
                />
            </div>
            <div className='box-for-favorites'></div>
            <footer className='footer'></footer>
        </div>
    )
}