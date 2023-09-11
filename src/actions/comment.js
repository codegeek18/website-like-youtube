import * as api from "../api";

export const postComment = (CommentData) => async (dispatch) => {
    try {
        const data = await api.postComment(CommentData);
        dispatch({ type: "POST_COMMENT", payload:data });
        dispatch(getAllComments());
    } catch (error) {
        console.log(error);
    }
};

export const editComment = (CommentData) => async (dispatch) => {
    try {
        const { id , commentBody } = CommentData;
        const { data } = await api.editComment(id, commentBody);
        dispatch({ type: "EDIT_COMMENT", payload: data });
        dispatch(getAllComments());
    } catch (error) {
        console.log(error);
    }
};

export const getAllComments = () => async (dispatch) => {
    try {
        const { data } = await api.getAllComments();
        dispatch({ type: 'FETCH_ALL_COMMENTS', payload: data });
    } catch (error) {
        console.log(error);   
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        await api.deleteComment(id);
        dispatch(getAllComments());
    } catch (error) {
        console.log(error);   
    }
};