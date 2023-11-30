import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import './LikeWatchLaterSaveBtns.css';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { RiHeartAddFill, RiPlayListAddFill, RiShareForwardLine } from 'react-icons/ri';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { likeVideo } from '../../actions/video';
import { addToLikedVideos, deleteLikedVideo } from '../../actions/likedVideo';
import { addToWatchLater, deleteWatchLater } from '../../actions/watchLater';

const LikeWatchLaterSaveBtns = ({ vv, vid }) => {
    const currentUser = useSelector(state => state?.currentUserReducer);

    const dispatch = useDispatch();
    const [saveVideo, setSaveVideo] = useState(false);
    const [dislikeBtn, setDislikeBtn] = useState(false);
    const [likeBtn, setLikeBtn] = useState(false);

    const likedVideoList = useSelector(state => state.likedVideoReducer);

    const watchLaterList = useSelector(state => state.watchLaterReducer);

    useEffect(() => {
        if (!currentUser) {
            setDislikeBtn(false);
            setLikeBtn(false);
            setSaveVideo(false);
        }

       likedVideoList?.data.filter(q => q?.videoId === vid && q?.Viewer === currentUser?.data?.result._id).map(() => setLikeBtn(true));

       watchLaterList?.data.filter(q => q?.videoId === vid && q?.Viewer === currentUser?.data?.result._id).map(() => setSaveVideo(true));
    }, [likedVideoList?.data, watchLaterList?.data, vid, currentUser?.data?.result._id]);

    const toggleSavedVideo = () => {
        if (currentUser) {
            if (saveVideo) {
                setSaveVideo(false);
                dispatch(deleteWatchLater({
                    videoId: vid,
                    Viewer: currentUser?.data?.result._id,
                }));
            }
            else {
                setSaveVideo(true);
                dispatch(addToWatchLater({
                    videoId: vid,
                    Viewer: currentUser?.data?.result._id,
                }));
            }
        } else {
            alert("Please Login to save the video!");
        }   
    };

    const toggleLikeBtn = (e, lk) => {
        if (currentUser) {
            if (likeBtn) {
                setLikeBtn(false);
                dispatch(
                    likeVideo({
                        id:vid,
                        Like: lk - 1,
                    })
                );
                dispatch(deleteLikedVideo({
                    videoId: vid,
                    Viewer: currentUser?.data?.result._id,
                }));
            }
            else {
                setLikeBtn(true);
                dispatch(
                    likeVideo({
                        id:vid,
                        Like: lk + 1,
                    })
                );
                dispatch(addToLikedVideos({
                    videoId: vid,
                    Viewer: currentUser?.data?.result._id,
                }))
                setDislikeBtn(false);
            }
        } else {
            alert("Please Login to Give a Like");
        }
    };

    const toggleDislikeBtn = (e, lk) => {
        if (currentUser) {
            if (dislikeBtn) {
                setDislikeBtn(false);
                dispatch(
                    likeVideo({
                        id:vid,
                        Like: lk + 1,
                    })
                );
            }
            else {
                setDislikeBtn(true);
                if (likeBtn) {
                    dispatch(
                        likeVideo({
                            id:vid,
                            Like: lk - 1,
                        })
                    );
                    dispatch(deleteLikedVideo({
                        videoId: vid,
                        Viewer: currentUser?.data?.result._id,
                    }));
                }
                setLikeBtn(false);
            }
        } else {
            alert("Please Login to Give a Dislike");
        }
    };

  return (
    <div className='btns_cont_videoPage'>
        <div className="btn_VideoPage">
            <BsThreeDots />
        </div>

        <div className="btn_VideoPage">
            <div className="like_videoPage" onClick={(e) => toggleLikeBtn(e,vv.Like)}>
                { likeBtn ? 
                    <AiFillLike size={22} className='btns_videoPage'/> 
                    :
                    <AiOutlineLike size={22} className='btns_videoPage'/>
                }
                <b>{vv?.Like}</b>
            </div>
            <div className="like_videoPage" onClick={(e) => toggleDislikeBtn(e,vv.Like)}>
                { dislikeBtn ? 
                    <>
                        <AiFillDislike size={22} className='btns_videoPage'/>
                    </> :
                    <>        
                        <AiOutlineDislike size={22} className='btns_videoPage'/>
                        <b>DISLIKE</b>
                    </>
                }
            </div>
            <div className="like_videoPage" onClick={() => toggleSavedVideo()}>
                { saveVideo ?
                    <>        
                        <MdPlaylistAddCheck size={22} className='btns_videoPage'/>
                        <b>Saved</b>
                    </> 
                    :
                    <>
                        <RiPlayListAddFill size={22} className='btns_videoPage'/>
                        <b>Save</b>
                    </>
                    
                }
            </div>
            <div className="like_videoPage">
                <RiHeartAddFill size={22} className='btns_videoPage'/>
                <b>Thanks</b>
            </div>
            <div className="like_videoPage">
                <RiShareForwardLine size={22} className='btns_videoPage'/>
                <b>Share</b>
            </div>
        </div>
    </div>
  )
}

export default LikeWatchLaterSaveBtns