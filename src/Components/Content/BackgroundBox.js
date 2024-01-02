import Result from '../result';
import ContentBox from './background-box-components/ContentBox'
import MyFirstSelect from './background-box-components/content-box-components/SelectFirst';
import MySecoundSelect from './background-box-components/content-box-components/SelectSecound';
import { useState, useReducer, useEffect } from 'react';
// import invertIMG from '../assets/invert.png'
import { whatIsFetchingAssign } from '../../functions/whatIsFetchingAssign';

// const reducer = (amount, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return { value: amount.value + 1 };
//         case 'DECREMENT':
//             return { value: amount.value - 1 };
//         case 'SET':
//             return { value: action.payload };
//         case 'DEFAULT-VALUE':
//             return { value: 1 }
//         default:
//             return amount;
//     }
// };


export default function BackgroundBox() {

    console.log("=======background-box is rednering ==============")

    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)

    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);

    const [inputFirstChange, setInputFirstChange] = useState(null)
    const [inputSecoundChange, setInputSecoundChange] = useState(null)

    const {whatIsFetching, invertingOptions} = whatIsFetchingAssign(firstSelectedOption, secoundSelectedOption, firstFormButtonSelection, secoundFormButtonSelection)

    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
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
            </div>
            <Result
                whatIsFetching={whatIsFetching}
                invertingOptions={invertingOptions}
                onFirstSelectedOption={firstSelectedOption}
                onSecoundSelectedOption={secoundSelectedOption}
            />
            <footer className='footer'></footer>
        </div>
    )
}