import * as api from "../api";

export const addToWatchLater = (watchLaterData) => async (dispatch) => {
    try {
        const data = await api.addToWatchLater(watchLaterData);
        dispatch({ type: "POST_WATCHLATER", data });
        dispatch(getAllWatchLaterVideos());
    } catch (error) {
        console.log(error);
    }
};

export const getAllWatchLaterVideos = () => async (dispatch) => {
    try {
        const { data } = await api.getAllWatchLaterVideos();
        dispatch({ type: 'FETCH_ALL_WATCHLATER_VIDEOS', payload: data });
    } catch (error) {
        console.log(error);   
    }
};

export const deleteWatchLater = (watchLaterData) => async (dispatch) => {
    try {
        const {videoId, Viewer} = watchLaterData;
        await api.deleteWatchLater(videoId, Viewer);
        dispatch(getAllWatchLaterVideos());
    } catch (error) {
        console.log(error);   
    }
};