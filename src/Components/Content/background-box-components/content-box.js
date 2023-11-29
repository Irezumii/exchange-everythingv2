import ImageBox from "./content-box-components/img-box";
import MyFirstSelect from "./content-box-components/select-first";
import SelectionButtonBox from "./content-box-components/selections-button-box";


export default function ContentBox (props){
    return (
        <div className="content-box" style={props.style}>
            <SelectionButtonBox />
            {props.onMySelect}
            <ImageBox/>
        </div>
    )
}