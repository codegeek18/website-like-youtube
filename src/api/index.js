import axios from "axios";

const API = axios.create({ baseURL: 'https://website-like-youtube-api.onrender.com'});
API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("Profile")).data.token
      }`;
    }
    return req;
  });

export const phoneUser = (phoneData) => API.post('/user/phoneUser', phoneData) 
export const login = (authData) =>  API.post('/user/login', authData);
export const updateChannelData = (id, updateData) => API.patch(`/user/update/${id}`, updateData);
export const fetchAllChannels = () => API.get('/user/getAllChannels');

export const uploadVideo = (fileData, fileOptions) => API.post('/video/uploadVideo', fileData, fileOptions);
export const getVideos = () => API.get('/video/getvideos');
export const likeVideo = (id, Like) => API.patch(`/video/like/${id}`, {Like});
export const viewsVideo = (id) => API.patch(`/video/view/${id}`);

export const addToLikedVideos = (likeVideoData) => API.post('/video/likeVideo', likeVideoData);
export const getAllLikedVideos = () => API.get('/video/getAllLikedVideos');
export const deleteLikedVideo = (videoId, Viewer) => API.delete(`/video/deleteLikedVideo/${videoId}/${Viewer}`);

export const addToWatchLater = (watchLaterData) => API.post('/video/watchLater', watchLaterData);
export const getAllWatchLaterVideos = () => API.get('/video/getAllWatchLaterVideos');
export const deleteWatchLater = (videoId, Viewer) => API.delete(`/video/deleteWatchLater/${videoId}/${Viewer}`);

export const addToHistory = (historyData) => API.post('/video/history', historyData);
export const getAllHistory = () => API.get('/video/getAllHistory');
export const clearHistory = (userId) => API.delete(`/video/clearHistory/${userId}`);

export const postComment = (CommentData) => API.post('/comment/post', CommentData);
export const deleteComment = (id) => API.delete(`/comment/delete/${id}`, id);
export const editComment = (id, commentBody) => API.patch(`/comment/edit/${id}`, {commentBody});
export const getAllComments = () => API.get('/comment/get');

