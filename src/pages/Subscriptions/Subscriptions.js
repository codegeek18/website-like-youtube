import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { MdSubscriptions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import ShowVideoList from '../../components/ShowVideoList/ShowVideoList';

const Subscriptions = () => {
    const currentUser = useSelector(state => state?.currentUserReducer);
    const subscriberList = useSelector(state => state?.subscriptionReducer);
    const videoList = useSelector(state => state.videoReducer);

    const currentSubscribedChannels = subscriberList?.data?.filter(subscriber => subscriber?.Subscriber === currentUser?.data?.result._id);

    const filteredVideos = videoList?.data?.filter( video => currentSubscribedChannels?.find(channel => channel?.ChannelSubscribed === video?.videoChannel));

  return (
    <div className='container_Pages_App'>
      <LeftSidebar />
      <div className='container2_Pages_App'>
        <div className="container_libraryPage">
            <h1 className='title_container_LibraryPage'>
              <b>
                <MdSubscriptions size={30}/>
              </b>
              <b style={{fontSize: "larger"}}>Latest</b>
            </h1>
            <div className='container_videoList_LibraryPage'>
              { currentUser ? 
                  filteredVideos
                  .reverse()
                  .map((video) => (
                    <ShowVideoList videoId={video?._id} key={video?._id} />
                  )) :
                  <h2 style={{ color: "white" }}>Please Login To See Your Subscriptions</h2>
              }
            </div>
        </div>
    </div>
    </div>

  )
}

export default Subscriptions