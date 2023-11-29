import ChooseButton from "./selection-button-box-components/choose-button";

export default function SelectionButtonBox () {
    return (
        <div className="buttons-selection-box">
            <ChooseButton name="Forex"/>
            <ChooseButton name="Crypto"/>
            <ChooseButton name="Stock"/>
        </div>
    )
}