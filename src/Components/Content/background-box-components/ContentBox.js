import SelectionButtonBox from "./content-box-components/SelectionButtonBox";

export default function ContentBox(props) {
    console.log("=======content box is rerendering ======================")

    return (
        <div className="content-box" style={props.style}>
            <SelectionButtonBox onSetFormButtonSelection={props.onSetFormButtonSelection}
                onFormButtonSelection={props.onFormButtonSelection} 
                onSetSelectedOption={props.onSetSelectedOption}
                />
            {props.onMySelect}
        </div>
    )
}