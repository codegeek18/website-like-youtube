import * as api from "../api";

export const addToLikedVideos = (likedVideoData) => async (dispatch) => {
    try {
        const data = await api.addToLikedVideos(likedVideoData);
        dispatch({ type: "POST_LIKEDVIDEO", data });
        dispatch(getAllLikedVideos());
    } catch (error) {
        console.log(error);
    }
};

export const getAllLikedVideos = () => async(dispatch) => {
    try {
        const { data } = await api.getAllLikedVideos();
        dispatch({ type: 'FETCH_ALL_LIKED_VIDEOS', payload: data });
    } catch (error) {
        console.log(error);   
    }
};

export const deleteLikedVideo = (likedVideoData) => async (dispatch) => {
    try {
        const {videoId, Viewer} = likedVideoData;
        await api.deleteLikedVideo(videoId, Viewer);
        dispatch(getAllLikedVideos());
    } catch (error) {
        console.log(error);   
    }
};