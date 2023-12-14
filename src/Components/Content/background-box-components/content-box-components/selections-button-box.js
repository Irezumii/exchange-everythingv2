

function ChooseButton(props) {

    const handleClick = () => {
        props.onSetFormButtonSelection(props.name)
        // props.onSetSelectedOption(" Wybierz Opcję....")

    }
    if (props.onFormButtonSelection === props.name) {
        return (
            <div className="choosen-button" onClick={handleClick}>{props.name}</div>
        )
    } else {
        return (
            <div className="choose-button" onClick={handleClick}>{props.name}</div>
        )
    }
}

export default function SelectionButtonBox(props) {
    return (
        <div className="buttons-selection-box">
            <ChooseButton name="Forex" onSetFormButtonSelection={props.onSetFormButtonSelection}
                onFormButtonSelection={props.onFormButtonSelection} 
                onSetSelectedOption={props.onSetSelectedOption}
                />
            <ChooseButton name="Crypto" onSetFormButtonSelection={props.onSetFormButtonSelection}
                onFormButtonSelection={props.onFormButtonSelection} 
                onSetSelectedOption={props.onSetSelectedOption}
                />
            <ChooseButton name="Stock" onSetFormButtonSelection={props.onSetFormButtonSelection}
                onFormButtonSelection={props.onFormButtonSelection} 
                onSetSelectedOption={props.onSetSelectedOption}
                />
        </div>
    )
}