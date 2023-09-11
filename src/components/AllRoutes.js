import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Library from '../pages/Library/Library'
import YourVideos from '../pages/YourVideos/YourVideos'
import WatchHistory from '../pages/WatchHistory/WatchHistory'
import LikedVideos from '../pages/LikedVideos/LikedVideos'
import WatchLater from '../pages/WatchLater/WatchLater'
import VideoPage from '../pages/VideoPage/VideoPage'
import Channel from '../pages/Channel/Channel'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import SignUp from '../pages/Login/SignUp'

const AllRoutes = ({ setEditCreateChannelBtn, setVidUploadPage }) => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/library' element={<Library />} />
        <Route path='/history' element={<WatchHistory />} />
        <Route path='/watchlater' element={<WatchLater />} />
        <Route path='/likedvideos' element={<LikedVideos />} />
        <Route path='/yourvideos' element={<YourVideos />} />
        <Route path='/videopage/:vid' element={<VideoPage />} />
        <Route path='/search/:searchQuery' element={<Search />} />
        <Route 
          path='/channel/:Cid' 
          element={<Channel 
            setVidUploadPage={setVidUploadPage}
            setEditCreateChannelBtn={setEditCreateChannelBtn}/>} 
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default AllRoutes