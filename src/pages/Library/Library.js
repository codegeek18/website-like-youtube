import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import WHLVideoList from '../../components/WHL/WHLVideoList';
import { FaHistory } from 'react-icons/fa';
import './Library.css';
import { MdOutlineWatchLater } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Library = () => {
 
  const currentUser = useSelector(state => state?.currentUserReducer);
  const historyList = useSelector(state => state.historyReducer);
  const watchLaterList = useSelector(state => state.watchLaterReducer);
  const likedVideoList = useSelector(state => state.likedVideoReducer);

  return (
    <div className='container_Pages_App'>
      <LeftSidebar />
      <div className='container2_Pages_App'>
        <div className="container_libraryPage">
            <h1 className='title_container_LibraryPage'>
              <b>
                <FaHistory />
              </b>
              <b>History</b>
            </h1>
            <div className='container_videoList_LibraryPage'>
              <WHLVideoList 
                page='History'
                currentUser={currentUser?.data?.result._id}
                videoList={historyList}
              />
            </div>
        </div>
        <div className="container_libraryPage">
            <h1 className='title_container_LibraryPage'>
              <b>
                <MdOutlineWatchLater />
              </b>
              <b>Watch Later</b>
            </h1>
            <div className='container_videoList_LibraryPage'>
              <WHLVideoList 
                page='Watch Later'
                currentUser={currentUser?.data?.result._id}
                videoList={watchLaterList}
              />
            </div>
        </div>
        <div className="container_libraryPage">
            <h1 className='title_container_LibraryPage'>
              <b>
                <AiOutlineLike />
              </b>
              <b>Liked Videos</b>
            </h1>
            <div className='container_videoList_LibraryPage'>
              <WHLVideoList 
                page='Liked Videos'
                currentUser={currentUser?.data?.result._id}
                videoList={likedVideoList}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Library