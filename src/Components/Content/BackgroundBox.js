import Result from './background-box-components/result';
import ContentBox from './background-box-components/ContentBox'
import { useState } from 'react';
import { whatIsFetchingAssign } from '../../functions/whatIsFetchingAssign';
import './BackgroundBox.css'

export default function BackgroundBox() {
    console.log("=======background-box is rednering ==============")

    //States that store types of selected exchange options.
    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)

    //States that store data about selected exchange options.
    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);

    //Based on the input, creating auxiliary variables to download data.
    const { whatIsFetching, invertingOptions } = whatIsFetchingAssign(firstSelectedOption, secoundSelectedOption, firstFormButtonSelection, secoundFormButtonSelection)


    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <div className='box-for-content-box'>
                <div className='content-box'>
                    {/* The first input box. */}
                    <ContentBox
                        onSetFirstSelectedOption={setFirstSelectedOption}
                        onSetFirstFormButtonSelection={setFirstFormButtonSelection}
                        onFirstFormButtonSelection={firstFormButtonSelection}
                    />
                </div>
                <div className='content-box' >
                {/* The secound input box. */}
                    <ContentBox
                        onSetSecoundSelectedOption={setSecoundSelectedOption}
                        onSetSecoundFormButtonSelection={setSecoundFormButtonSelection}
                        onSecoundFormButtonSelection={secoundFormButtonSelection}
                    />
                </div>
            </div>
            {/* A component that handles all the operations on data. */}
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