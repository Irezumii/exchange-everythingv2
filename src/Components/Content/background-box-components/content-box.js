import ImageBox from "./content-box-components/img-box";
import MyFirstSelect from "./content-box-components/select-first";
import SelectionButtonBox from "./content-box-components/selections-button-box";
import { useState } from "react";


export default function ContentBox(props) {
    console.log("=======content box is rerendering ======================")

    return (
        <div className="content-box" style={props.style}>
            <SelectionButtonBox onSetFormButtonSelection={props.onSetFormButtonSelection}
                onFormButtonSelection={props.onFormButtonSelection} 
                onSetSelectedOption={props.onSetSelectedOption}
                />
            {props.onMySelect}
            <ImageBox onItemImage={props.onItemImage} onFormButtonSelection={props.onFormButtonSelection} />
        </div>
    )
}