import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import ShowDiscussion from './ShowDiscussion'
import {useUpdateDiscussionReadMutation} from '../app/discussionApiSlice'
import { useNavigate,useLocation } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';

const Disscussionbutton = (props) => {
    const [update,{ data, isError, isSuccess }] = useUpdateDiscussionReadMutation() 
    const location = useLocation()

    const { discussion,name } = location.state||{}
    const [show, setShow] = useState(false)
   const date=props?.discussion?.updatedAt?.slice(0,10) 
    const navigate=useNavigate()
    const onClickButton = () => {
        setShow(!show)
        const obj={id:props.discussion._id,read:"true"}
        
        update(obj)
        navigate(`/ShowDiscussion`, { state: { discussion: props?.discussion?props.discussion:discussion, name: props?.name?props.name:name  } })

    }
    
    return (
        <div style={{ width: '100%', alignItems: 'center' }}>
            <br />
            <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={` created by: ${props?.discussion?.userId?.name}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t\t${props?.discussion?.discussionName}`} style={{  width: '80%' }} onClick={()=>onClickButton()}></InputTextarea ></div>

        {/* <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={`${props.discussion.discussionName},updated at:${date}`} style={{ direction: 'rtl', width: '100%'}} onClick={()=>onClickButton()} ></InputTextarea ></div> */}
           {/* <Button label={props.discussion.discussionName} onClick={() =>onClickButton()} style={{width:'150px',justifyContent:'center'}}/> */}
            
            {/* {show && <ShowDiscussion discussion={props.discussion} refetch={props.refetch} />} */}
        </div>
    )
}
export default Disscussionbutton
