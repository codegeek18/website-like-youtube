import React from 'react'
import ShowVideoGrid from '../../components/ShowVideoGrid/ShowVideoGrid'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import DescribeChannel from './DescribeChannel';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Channel = ({ setEditCreateChannelBtn, setVidUploadPage }) => {
    const { Cid } = useParams();
    const vids = useSelector(state => state.videoReducer)?.data?.filter(q => q?.videoChannel === Cid).reverse();
    
  return (
    <div className='container_Pages_App'>
      <LeftSidebar />
      <div className='container2_Pages_App'>
        <DescribeChannel 
            Cid={Cid}
            setVidUploadPage={setVidUploadPage}
            setEditCreateChannelBtn={setEditCreateChannelBtn} 
        />
        <ShowVideoGrid vids={vids}/>
      </div>
    </div>
  )
}

export default Channel