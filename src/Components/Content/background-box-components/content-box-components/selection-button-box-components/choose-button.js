export default  function ChooseButton (props) {

    const handleClick=()=>{
        props.onSetFormButtonSelection(props.name)
    }

    return (
        <div className="choose-button" onClick={handleClick}>{props.name}</div>
    )
}