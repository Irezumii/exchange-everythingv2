export default function ImageBox (props) {
    return (
        <div className="img-box">
            <img src={props.onItemImage} alt="" />
        </div>
    )
}