import React, { useEffect, useState } from 'react'
import './Comments.css';
import DisplayComments from './DisplayComments';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../actions/comment';
import axios from 'axios';

const Comments = ({ videoId }) => {
    const [commentText, setCommentText] = useState('');

    const currentUser = useSelector(state => state?.currentUserReducer);
    const commentsList = useSelector(state => state?.commentReducer);

    const [currLocation, setCurrLocation] = useState({});


    useEffect(() => {
        const getLocation = async () => {
            const location = await axios.get('https://ipapi.co/json');
            setCurrLocation(location.data);
            // console.log(currLocation);
        };
        getLocation();
    }, [])

    

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser) {
            if (!commentText) {
                alert("Please Type your commment");
            } else {
                dispatch(
                    postComment({
                        videoId: videoId,
                        userId: currentUser?.data?.result._id,
                        commentBody: commentText,
                        userCommented: currentUser?.data?.result.name,
                        commentLocation: currLocation.city + ", " + currLocation.country_name
                    })
                );
                setCommentText("");
            }
        } else {
            alert("Please Login to post your comment")
        }
    };

    

  return (
    <>
        <form
            className='comments_sub_form_comments'
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                onChange={(e) => setCommentText(e.target.value)}
                placeholder='Add a Comment...' 
                value={commentText}
                className='comment_ibox'
            />
            <input type="submit" value="Comment" className='comment_add_btn_comment' />
        </form>
        
        <div className="display_comment_container">
            {
                commentsList?.data?.filter(q => videoId === q?.videoId).reverse().map(comment => (        
                    <DisplayComments 
                        key={comment._id}
                        cId = {comment._id}
                        userId={comment.userId}
                        commentBody={comment.commentBody}
                        commentOn={comment.CommentOn}
                        userCommented={comment.userCommented}
                        commentLocation={comment?.commentLocation}
                    />
                ))
            }
        </div>  
    </>
  )
}

export default Comments