import React, { useCallback, useEffect } from 'react'
import './VideoPage.css';
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
import Comments from '../../components/Comments/Comments';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addToHistory } from '../../actions/history';
import { viewVideo } from '../../actions/video';
import ShowVideoGrid from '../../components/ShowVideoGrid/ShowVideoGrid';
import SubscribeBtn from './SubscribeBtn';

const VideoPage = () => {
    const { vid } = useParams();
    const vids = useSelector(state => state.videoReducer);
    const vv = vids?.data.filter(q => q._id === vid)[0];
    const moreVideos = vids?.data.filter(q => q._id !== vid);

    const currentUser = useSelector(state => state?.currentUserReducer);
    const dispatch = useDispatch();
    // const handleHistory = () => {
    //     dispatch(
    //         addToHistory({
    //             videoId: vid,
    //             Viewer: currentUser?.data?.result._id,
    //         })
    //     )
    // };
    const handleHistory = useCallback(() => {
        dispatch(
            addToHistory({
                videoId: vid,
                Viewer: currentUser?.data?.result._id,
            })
        )
    }, [currentUser?.data?.result._id, dispatch, vid]);


    const handleViews = useCallback(() => {
        dispatch(viewVideo({
            id: vid
        }))
    }, [dispatch, vid])

    useEffect(() => {
        if (currentUser) {
            handleHistory();
            handleViews();
        }
        else {
            handleViews();
        }
    }, [currentUser, handleHistory, handleViews]);

  return (
    <>
        <div className="container_videoPage">
            <div className="container2_videoPage">
                <div className='video_display_screen_videoPage'>
                    <video 
                        // src={`https://website-like-youtube-api.onrender.com/${vv.filePath}`}
                        // src={vid.filePath}
                        className='video_ShowVideo_videoPage'
                        controls
                        autoPlay
                        src={vv.filePath} 
                        type='video/mp4'
                    >
                        {/* <source src={vv.filePath} type='video/mp4'/> */}
                    </video>
                    <div className="video_details_videoPage">
                        <div className="video_btns_title_VideoPage_container">
                            <p className='video_title_VideoPage'>{vv.videoTitle}</p>
                            <div className='views_date_btns_VideoPage'>
                                <div className="views_videoPage">
                                    {vv?.Views} views <div className='dot'></div> {moment(vv?.createdAt).fromNow()}
                                </div>
                                <SubscribeBtn vc={vv?.videoChannel} />
                                <LikeWatchLaterSaveBtns vv={vv} vid={vid}/>
                            </div>
                        </div>
                        <Link to={`/channel/${vv?.videoChannel}`} className="channel_details_videoPage">
                            <b className="channel_logo_videoPage">
                                <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                            </b>
                            <p className='channel_name_videoPage'>{vv?.uploader}</p>
                        </Link>
                        <div className="comments_VideoPage">
                            <h2>
                                <u>Comments</u>
                            </h2>
                            <Comments videoId={vv._id}/>
                        </div>
                    </div>
                </div>

                <div className="moreVideosBar">
                    More Videos
                    <ShowVideoGrid vids={moreVideos} />
                </div>   
            </div>
        </div>
    </>
  )
}

export default VideoPage