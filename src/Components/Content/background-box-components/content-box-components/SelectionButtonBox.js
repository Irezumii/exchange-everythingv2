

function ChooseButton(props) {
    console.log("======= ChooseN button is rendering ======================")
    const handleClick = () => {
        props.onSetFormButtonSelection(props.name)
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
                />
            <ChooseButton name="Crypto" onSetFormButtonSelection={props.onSetFormButtonSelection}
                />
            <ChooseButton name="Stock" onSetFormButtonSelection={props.onSetFormButtonSelection}
                />
        </div>
    )
}