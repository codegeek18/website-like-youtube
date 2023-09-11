import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './components/AllRoutes';
import DrawerSidebar from './components/LeftSidebar/DrawerSidebar';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateEditChannel from './pages/Channel/CreateEditChannel';
import { useDispatch } from 'react-redux';
import { fetchAllChannels } from './actions/channelUser';
import { getAllVideos } from './actions/video';
import VideoUpload from './pages/VideoUpload/VideoUpload';
import { getAllLikedVideos } from './actions/likedVideo';
import { getAllWatchLaterVideos } from './actions/watchLater';
import { getAllHistory } from './actions/history';
import { getAllComments } from './actions/comment';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllChannels());
    dispatch(getAllVideos());
    dispatch(getAllLikedVideos());
    dispatch(getAllWatchLaterVideos());
    dispatch(getAllHistory());
    dispatch(getAllComments());
  }, [dispatch]);

  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none",
  });

  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === 'none')
      setToggleDrawerSidebar({
        display: "flex"
      }) 
    else
      setToggleDrawerSidebar({
        display: "none"
      })
  };

  const [vidUploadPage, setVidUploadPage] = useState(false);
  const [editCreateChannelBtn, setEditCreateChannelBtn]= useState(false);

  return (
    <Router>
      {
        vidUploadPage && <VideoUpload setVidUploadPage={setVidUploadPage} />
      }
      {
        editCreateChannelBtn && <CreateEditChannel setEditCreateChannelBtn={setEditCreateChannelBtn}/>
      }
      <Navbar setEditCreateChannelBtn={setEditCreateChannelBtn} toggleDrawer={toggleDrawer} />
      {<DrawerSidebar toggleDrawerSidebar={toggleDrawerSidebar} toggleDrawer={toggleDrawer} />}
      <AllRoutes setEditCreateChannelBtn={setEditCreateChannelBtn} setVidUploadPage={setVidUploadPage}/>
    </Router>
  );
}

export default App;
