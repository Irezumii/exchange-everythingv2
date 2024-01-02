import Result from '../result';
import ContentBox from './background-box-components/ContentBox'
import { useState } from 'react';
import { whatIsFetchingAssign } from '../../functions/whatIsFetchingAssign';

export default function BackgroundBox() {

    console.log("=======background-box is rednering ==============")

    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)

    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);


    const { whatIsFetching, invertingOptions } = whatIsFetchingAssign(firstSelectedOption, secoundSelectedOption, firstFormButtonSelection, secoundFormButtonSelection)

    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <div className='box-for-content-box'>
                <ContentBox
                    style={{ borderRadius: "20px 0 0 20px" }}
                    onSetFirstSelectedOption={setFirstSelectedOption}
                    onSetFirstFormButtonSelection={setFirstFormButtonSelection}
                    onFirstFormButtonSelection={firstFormButtonSelection}
                />
                <ContentBox
                    style={{ borderRadius: "0 20px 20px 0" }}
                    onSetSecoundSelectedOption={setSecoundSelectedOption}
                    onSetSecoundFormButtonSelection={setSecoundFormButtonSelection}
                    onSecoundFormButtonSelection={secoundFormButtonSelection}
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