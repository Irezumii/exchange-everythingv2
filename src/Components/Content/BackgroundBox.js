import Result from '../result';
import ContentBox from './background-box-components/ContentBox'
import MyFirstSelect from './background-box-components/content-box-components/SelectFirst';
import MySecoundSelect from './background-box-components/content-box-components/SelectSecound';
import { useState, useReducer, useEffect } from 'react';
import invertIMG from '../assets/invert.png'

const reducer = (amount, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { value: amount.value + 1 };
        case 'DECREMENT':
            return { value: amount.value - 1 };
        case 'SET':
            return { value: action.payload };
        case 'DEFAULT-VALUE':
            return { value: 1 }
        default:
            return amount;
    }
};


export default function BackgroundBox() {
    
    console.log("=======background-box is rednering ==============")
    
    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)
    
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);
    
    const [invert, setInvert] = useState(false)
    
    const [inputFirstChange, setInputFirstChange] = useState(null)
    const [inputSecoundChange, setInputSecoundChange] = useState(null)
    
    const [amount, dispatch] = useReducer(reducer, { value: 1 });
    
    useEffect(function(){
        if(firstSelectedOption !== null && secoundSelectedOption !== null){
            dispatch({type: 'DEFAULT-VALUE'})
        }
    }, [firstSelectedOption, secoundSelectedOption])

    function handleInvert() {
        setInvert(!invert)
    }

    function handleInputChange(e) {
        const newValue = parseInt(e.target.value, 10);
        dispatch({ type: 'SET', payload: isNaN(newValue) ? 0 : newValue });
    }

    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <div className='box-for-amount'>
                <h2>Amount</h2>
                <div>
                    <button onClick={() => {
                        if (amount && amount.value >= 2) {
                            dispatch({ type: 'DECREMENT' })
                        } else {
                            console.log("Nie możesz mieć liczby mniejszej niż 1")
                        }

                    }}>-</button>
                    <input
                        className='amount-input'
                        type="text"
                        value={amount.value}
                        onChange={handleInputChange}
                    />
                    <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
                </div>
            </div>
            <div className='box-for-content-box'>
                <ContentBox
                    style={{ borderRadius: "20px 0 0 20px" }}
                    onMySelect={<MyFirstSelect
                        onFormButtonSelection={firstFormButtonSelection}
                        onFirstSelectedOption={firstSelectedOption}
                        onSetFirstSelectedOption={setFirstSelectedOption}

                        onInputChange={inputFirstChange}
                        onSetInputFirstChange={setInputFirstChange}

                    />}
                    onFormButtonSelection={firstFormButtonSelection}
                    onSetFormButtonSelection={setFirstFormButtonSelection}
                    onSetSelectedOption={setFirstSelectedOption}
                />
                <ContentBox
                    style={{ borderRadius: "0 20px 20px 0" }}
                    onMySelect={<MySecoundSelect
                        onFormButtonSelection={secoundFormButtonSelection}
                        onSecoundSelectedOption={secoundSelectedOption}
                        onSetSecoundSelectedOption={setSecoundSelectedOption}

                        onInputChange={inputSecoundChange}
                        onSetInputSecoundChange={setInputSecoundChange}

                    />}
                    onFormButtonSelection={secoundFormButtonSelection}
                    onSetFormButtonSelection={setSecoundFormButtonSelection}
                    onSetSelectedOption={setSecoundSelectedOption}

                />
                <div className="invert" onClick={handleInvert}>
                    <img src={invertIMG} alt="invert button" />
                </div>
            </div>
            <Result
                onFirstFormButtonSelection={firstFormButtonSelection}
                onSecoundFormButtonSelection={secoundFormButtonSelection}

                onSecoundSelectedOption={secoundSelectedOption}
                onFirstSelectedOption={firstSelectedOption}

                invert={invert}
                setInvert={setInvert}

                onAmount={amount.value}
            />
            <footer className='footer'></footer>
        </div>
    )
}