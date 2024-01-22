import { useState } from "react";
import SelectionButtonBox from "./content-box-components/SelectionButtonBox";
import SelectOption from "./content-box-components/SelectOption";

export default function ContentBox(props) {
    console.log("=======content box is rerendering ======================")

    const [inputFirstChange, setInputFirstChange] = useState(null)
    const [inputSecoundChange, setInputSecoundChange] = useState(null)

    return (
        <>
            {/* // <div className="content-box"> */}
            {props.onSetFirstSelectedOption ?
                <>
                    <SelectionButtonBox onSetFormButtonSelection={props.onSetFirstFormButtonSelection}
                        onFormButtonSelection={props.onFirstSelectedOption}
                        onSetSelectedOption={props.onSetFirstSelectedOption}
                    />
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