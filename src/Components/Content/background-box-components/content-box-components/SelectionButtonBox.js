import { useState } from 'react'
import './SelectionButtonBox.css'

function ChooseButton(props) {
    console.log("======= ChooseN button is rendering ======================")
    const handleClick = () => {
        props.onSetFormButtonSelection(props.name)
        props.setChoosen(props.name)
    }
    if (props.choosen === props.name) {
        return (
            <div className="choose-button choosen-button" onClick={handleClick}>{props.name}</div>
        )
    } else {
        return (
            <div className="choose-button" onClick={handleClick}>{props.name}</div>
        )
    }
}

export default function SelectionButtonBox(props) {
    const [choosen, setChoosen] = useState(null)
    return (
        <div className="buttons-selection-box">
            <ChooseButton name="Forex" onSetFormButtonSelection={props.onSetFormButtonSelection}
                choosen={choosen}
                setChoosen={setChoosen}
            />
            <ChooseButton name="Crypto" onSetFormButtonSelection={props.onSetFormButtonSelection}
                choosen={choosen}
                setChoosen={setChoosen}
            />
            <ChooseButton name="Stock" onSetFormButtonSelection={props.onSetFormButtonSelection}
                choosen={choosen}
                setChoosen={setChoosen}
            />
        </div>
    )
}