import Result from '../result'
import  ContentBox  from './background-box-components/content-box'
import MyFirstSelect from './background-box-components/content-box-components/select-first';
import MySecoundSelect from './background-box-components/content-box-components/select-secound';

export default function BackgroundBox (){
    return(
        <div className="background-box">
            <span className='title'>Exchange Everything</span>
            <ContentBox style={{borderRadius: "20px 0 0 20px"}} onMySelect={<MyFirstSelect/>}/>
            <ContentBox style={{borderRadius: "0 20px 20px 0"}} onMySelect={<MySecoundSelect/>}/>
            <Result/>
        </div>
    )
}