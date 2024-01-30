import { useState } from "react";
import SelectionButtonBox from "./content-box-components/SelectionButtonBox";
import SelectOption from "./content-box-components/SelectOption";
import './ContentBox.css'

export default function ContentBox(props) {
    console.log("=======content box is rerendering ======================")

    //States used to store text input from the form to search for a specific stock.
    const [inputFirstChange, setInputFirstChange] = useState(null)
    const [inputSecoundChange, setInputSecoundChange] = useState(null)

    return (
        <>
            {props.onSetFirstSelectedOption ?
                <>
                    {/* The component in which data type selection buttons are located. */}
                    <SelectionButtonBox onSetFormButtonSelection={props.onSetFirstFormButtonSelection}
                        onFormButtonSelection={props.onFirstSelectedOption}
                        onSetSelectedOption={props.onSetFirstSelectedOption}
                    />
                    {/* The component where inputs for specific values are located. */}
                    <SelectOption
                        onFormButtonSelection={props.onFirstFormButtonSelection}
                        onSelectedOption={props.onFirstSelectedOption}
                        onSetSelectedOption={props.onSetFirstSelectedOption}

                        onInput={inputFirstChange}
                        onSetInput={setInputFirstChange}
                    />
                </>
                :
                <>
                    <SelectionButtonBox onSetFormButtonSelection={props.onSetSecoundFormButtonSelection}
                        onFormButtonSelection={props.onSecoundSelectedOption}
                        onSetSelectedOption={props.onSetSecoundSelectedOption}
                    />
                    <SelectOption
                        onFormButtonSelection={props.onSecoundFormButtonSelection}
                        onSelectedOption={props.onSecoundSelectedOption}
                        onSetSelectedOption={props.onSetSecoundSelectedOption}

                        onInput={inputSecoundChange}
                        onSetInput={setInputSecoundChange}
                    />
                </>
            }
            {/* </div> */}
        </>
    )
}