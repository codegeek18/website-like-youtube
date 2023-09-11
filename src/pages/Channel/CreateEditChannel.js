import React, { useState } from 'react'
import './CreateEditChannel.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';
import { updateChannelData } from '../../actions/channelUser';

const CreateEditChannel = ({ setEditCreateChannelBtn }) => {
    
    const currentUser = useSelector(state => state.currentUserReducer);
    const [name, setName] = useState(currentUser?.data?.result.name);
    const [desc, setDesc] = useState(currentUser?.data?.result.desc);

    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (!name) {
            alert("Please Enter Name!");
        } else if (!desc) {
            alert("Please Enter Description!");
        } else {
            dispatch(updateChannelData(currentUser?.data?.result._id,{
                name: name,
                desc: desc,
            }));
            setEditCreateChannelBtn(false);
            setTimeout(() => {
                dispatch(login({email: currentUser?.data?.result.email}))
            }, 5000);
        }
        
    };
  return (
    <div className='container_createEditChannel'>
        <input 
                type="submit" 
                name='text'
                value={"X"}
                className='ibtn_x'
                onClick={() => setEditCreateChannelBtn(false)}
            />
        <div className='container2_createEditChannel'>
            <h1>
                {currentUser?.data?.result?.name ? "Edit" : "Create"}  Your Channel
            </h1>
            <input 
                type="text" 
                placeholder='Enter Your/ Channel Name'
                className='ibox'
                name='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea 
                type="text"
                rows="15"
                placeholder='Enter Channel Description'
                className='ibox'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <input 
                type="submit"
                value={"Submit"}
                className='ibtn'
                onClick={handleSubmit}
            />
        </div>

    </div>
  )
}

export default CreateEditChannel