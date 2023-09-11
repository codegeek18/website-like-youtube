import React, { useState } from 'react'
import './Comments.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/comment';
import { MdLocationOn } from 'react-icons/md';
import moment from 'moment';

const DisplayComments = ({ cId, userId, commentOn, commentBody, userCommented, commentLocation }) => {
    const currentUser = useSelector(state => state?.currentUserReducer);
    const [edit, setEdit] = useState(false);
    const [cmtBdy, setCmtBdy] = useState('');
    const [cmtId, setCmtId] = useState('');
    const handleEdit = (ctId, ctBdy) => {
        setEdit(true);
        setCmtId(ctId);
        setCmtBdy(ctBdy);
    };

    const handleDelete = (id) => {
        dispatch(deleteComment(id));
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cmtBdy) {
            alert("Type your comment");
        } else {
            dispatch(
                editComment({
                    id: cmtId,
                    commentBody: cmtBdy
                })
            );
            setCmtBdy('');
        }
        setEdit(false);
    };

  return (
    <>
        {
            edit ? (
                <form
                    className='comments_sub_form_comments'
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="text" 
                        onChange={(e) => setCmtBdy(e.target.value)}
                        placeholder='Edit Comment...' 
                        value={cmtBdy}
                        className='comment_ibox'
                    />
                    <input type="submit" value="Change" className='comment_add_btn_comment' />
                </form>
            ) : (
                <p className='comment_body'>{commentBody}</p>
            )
        }
        <p className="usercommented"> <span>{userCommented} <span className='usercommented_time'>commented {moment(commentOn).fromNow()}</span></span>
        <span>{commentLocation && commentLocation!==', ' && <span style={{fontWeight: "normal", fontStyle: "italic"}}><MdLocationOn />{commentLocation}</span>}</span></p>
        {
            currentUser?.data?.result?._id === userId && (
                <p className="EditDel_DisplayComment">
                    <i onClick={() => handleEdit(cId, commentBody)}>Edit</i>
                    <i onClick={() => handleDelete(cId)}>Delete</i>
                </p>
            )
        }
        
    </>
  )
}

export default DisplayComments