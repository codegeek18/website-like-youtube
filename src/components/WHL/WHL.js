import React from 'react'
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import './WHL.css';
import WHLVideoList from './WHLVideoList';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from '../../actions/history';

const WHL = ({ page, videoList }) => {
  const currentUser = useSelector(state => state?.currentUserReducer);

  const dispatch = useDispatch();
  const handleClearHistory = () => {
    if (currentUser) {
      dispatch(clearHistory({
        userId: currentUser?.data?.result._id
      }))
    }
  };

  return (
    <div className='container_Pages_App'>
      <LeftSidebar />
      <div className='container2_Pages_App'>
        <div className='container_whl'>
            <div className="box_WHL leftside_whl">
                <b>Your {page} Shown Here </b>
                {
                  page === 'History' && 
                  <div className="clear_History_btn" onClick={() => handleClearHistory()}>
                      Clear History
                  </div>
                }
            </div>
            <div className="rightSide_whl">
                <h1>{page}</h1>
                <div className="whl_list">
                    <WHLVideoList 
                        page={page}
                        videoList={videoList}
                        currentUser={currentUser?.data?.result._id}
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WHL