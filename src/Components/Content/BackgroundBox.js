import Result from '../result';
import ContentBox from './background-box-components/ContentBox'
import { useState, useRef } from 'react';
import { whatIsFetchingAssign } from '../../functions/whatIsFetchingAssign';

export default function BackgroundBox() {

    console.log("=======background-box is rednering ==============")

    const [firstFormButtonSelection, setFirstFormButtonSelection] = useState(null)
    const [secoundFormButtonSelection, setSecoundFormButtonSelection] = useState(null)

    const [firstSelectedOption, setFirstSelectedOption] = useState(null);
    const [secoundSelectedOption, setSecoundSelectedOption] = useState(null);

    const { whatIsFetching, invertingOptions } = whatIsFetchingAssign(firstSelectedOption, secoundSelectedOption, firstFormButtonSelection, secoundFormButtonSelection)

    const firstFormBoxRef = useRef(null)
    const secoundfFormBoxRef = useRef(null)

    return (
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <div className='box-for-content-box'>
                <div className='content-box' ref={firstFormBoxRef}>
                    <ContentBox
                        onSetFirstSelectedOption={setFirstSelectedOption}
                        onSetFirstFormButtonSelection={setFirstFormButtonSelection}
                        onFirstFormButtonSelection={firstFormButtonSelection}
                    />
                </div>
                <div className='content-box'ref={secoundfFormBoxRef}>
                    <ContentBox
                        onSetSecoundSelectedOption={setSecoundSelectedOption}
                        onSetSecoundFormButtonSelection={setSecoundFormButtonSelection}
                        onSecoundFormButtonSelection={secoundFormButtonSelection}
                    />
                </div>
            </div>
            <Result
                whatIsFetching={whatIsFetching}
                invertingOptions={invertingOptions}
                onFirstSelectedOption={firstSelectedOption}
                onSecoundSelectedOption={secoundSelectedOption}
                onFirstFormBoxRef={firstFormBoxRef}
                onSecoundFormBoxRef={secoundfFormBoxRef}
            />
            <div className="box-for-history"></div>
            <footer className='footer'></footer>
        </div>
    )
}